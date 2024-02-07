import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Manager, { ManagerProps } from "@/components/Manager";
import defaultMetadata from "@/lib/defaultMetadata";
import microcmsClient from "@/lib/microcmsClient";

type GetManagerParams = {
  managerId: string;
};

type GetManagerData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent({
  managerId,
}: GetManagerParams): Promise<GetManagerData> {
  const response = await microcmsClient.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId: managerId,
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 3600 : false,
      },
    },
    endpoint: "talents",
  });

  return response;
}

export type PageProps = {
  params: { managerId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { managerId },
}: PageProps): Promise<Metadata> {
  const { name, profile } = await microcmsClient.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId: managerId,
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 3600 : false,
      },
    },
    endpoint: "talents",
  });

  return {
    alternates: {
      canonical: `/managers/${managerId}`,
    },
    description: profile,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: profile,
      title: name,
      type: "article",
      url: `/managers/${managerId}`,
    },
    title: name,
    twitter: {
      ...defaultMetadata.twitter,
      description: profile,
      title: name,
    },
  };
}

type GetManagerListData = MicroCMSListResponse<MicroCMS.Talent>;

async function getManagerList(): Promise<GetManagerListData> {
  const response = await microcmsClient.getList<MicroCMS.Talent>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 3600 : false,
      },
    },
    endpoint: "talents",
    queries: {
      limit: 100,
    },
  });

  return response;
}

export default async function Page({
  params: { managerId },
  searchParams: { blogId },
}: PageProps): Promise<JSX.Element> {
  const { images, iriamUrl, name, profile, twitterUrl } = await getTalent({
    managerId,
  });

  if (
    !images ||
    (typeof blogId !== "undefined" && typeof blogId !== "string")
  ) {
    notFound();
  }

  const { height, url, width } = images[0];
  const { contents: talentListContents } = await getManagerList();
  const managers: ManagerProps["managers"] = talentListContents
    .filter(({ type }) => type.includes("マネージャー"))
    .map(({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    }));
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const talents: ManagerProps["talents"] = talentListContents
    .filter(({ images }) => Array.isArray(images) && images.length > 0)
    .map(({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    }));

  return (
    <Manager
      createdAt=""
      height={height}
      iriamUrl={iriamUrl}
      managers={managers}
      name={name}
      profile={profile}
      talents={talents}
      title=""
      twitterUrl={twitterUrl}
      url={url}
      width={width}
    />
  );
}
