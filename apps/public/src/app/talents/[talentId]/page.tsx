import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Talent, { TalentProps } from "@/components/Talent";
import defaultMetadata from "@/lib/defaultMetadata";
import microcmsClient from "@/lib/microcmsClient";

type GetTalentParams = {
  talentId: string;
};

type GetTalentData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent({
  talentId,
}: GetTalentParams): Promise<GetTalentData> {
  const response = await microcmsClient.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId: talentId,
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
  params: { talentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { talentId },
}: PageProps): Promise<Metadata> {
  const { name, profile } = await microcmsClient.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId: talentId,
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 3600 : false,
      },
    },
    endpoint: "talents",
  });

  return {
    alternates: {
      canonical: `/talents/${talentId}`,
    },
    description: profile,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: profile,
      title: name,
      type: "article",
      url: `/talents/${talentId}`,
    },
    title: name,
    twitter: {
      ...defaultMetadata.twitter,
      description: profile,
      title: name,
    },
  };
}

type GetTalentListData = MicroCMSListResponse<MicroCMS.Talent>;

async function getTalentList(): Promise<GetTalentListData> {
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
  params: { talentId },
  searchParams: { blogId },
}: PageProps): Promise<JSX.Element> {
  const { images, iriamUrl, name, profile, twitterUrl } = await getTalent({
    talentId,
  });

  if (
    !images ||
    (typeof blogId !== "undefined" && typeof blogId !== "string")
  ) {
    notFound();
  }

  const { height, url, width } = images[0];
  const { contents: talentListContents } = await getTalentList();
  const talents: TalentProps["talents"] = talentListContents
    .filter(({ type }) => type.includes("タレント"))
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
  const topTalents: TalentProps["topTalents"] = talentListContents
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
    <Talent
      createdAt=""
      height={height}
      iriamUrl={iriamUrl}
      name={name}
      profile={profile}
      talents={talents}
      title=""
      topTalents={topTalents}
      twitterUrl={twitterUrl}
      url={url}
      width={width}
    />
  );
}
