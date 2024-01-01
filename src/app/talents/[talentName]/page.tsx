import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Talent, { TalentProps } from "@/components/Talent";
import client from "@/lib/client";
import defaultMetadata from "@/lib/defaultMetadata";

type GetTalentParams = {
  furigana: string;
};

type GetTalentData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent({
  furigana,
}: GetTalentParams): Promise<GetTalentData> {
  const [contentId] = await client.getAllContentIds({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
    filters: `furigana[equals]${furigana}`,
  });
  const response = await client.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId,
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
  });

  return response;
}

export type PageProps = {
  params: { talentName: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params: { talentName },
}: PageProps): Promise<Metadata> {
  const [contentId] = await client.getAllContentIds({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
    filters: `furigana[equals]${talentName}`,
  });
  const { name, profile } = await client.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId,
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
  });

  return {
    alternates: {
      canonical: `/talents/${talentName}`,
    },
    description: profile,
    openGraph: {
      ...defaultMetadata.openGraph,
      description: profile,
      title: name,
      type: "article",
      url: `/talents/${talentName}`,
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
  const response = await client.getList<MicroCMS.Talent>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
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
  params: { talentName },
}: PageProps): Promise<JSX.Element> {
  const { images, iriamUrl, name, profile, twitterUrl } = await getTalent({
    furigana: talentName,
  });

  if (!images) {
    notFound();
  }

  const { height, url, width } = images[0];
  const { contents: talentListContents } = await getTalentList();
  const talents: TalentProps["talents"] = talentListContents
    .filter(({ furigana }) => talentName !== furigana)
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
      height={height}
      iriamUrl={iriamUrl}
      name={name}
      profile={profile}
      talents={talents}
      twitterUrl={twitterUrl}
      url={url}
      width={width}
    />
  );
}
