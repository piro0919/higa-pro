/* eslint-disable filenames/match-exported */
import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Metadata } from "next";
import Talent, { TalentProps } from "@/components/Talent";
import client from "@/libs/client";

type StaticParam = {
  talentName: string;
};

type StaticParams = StaticParam[];

export async function generateStaticParams(): Promise<StaticParams> {
  const { contents } = await client.getList<MicroCMS.Talent>({
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

  return contents.map(({ furigana }) => ({
    talentName: furigana,
  }));
}

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

type TalentNameProps = {
  params: {
    talentName: string;
  };
};

export async function generateMetadata({
  params: { talentName },
}: TalentNameProps): Promise<Metadata> {
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
    description: profile,
    title: name,
  };
}

export default async function TalentName({
  params: { talentName },
}: TalentNameProps): Promise<JSX.Element> {
  const { debut, furigana, images, iriamUrl, name, profile, rank, twitterUrl } =
    await getTalent({
      furigana: talentName,
    });
  const { contents: talentListContents } = await getTalentList();
  const talents: TalentProps["talents"] = talentListContents.map(
    ({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    })
  );

  return (
    <Talent
      debut={debut}
      furigana={furigana}
      image={images?.at(0)}
      iriamUrl={iriamUrl}
      name={name}
      profile={profile}
      rank={rank}
      talents={talents}
      twitterUrl={twitterUrl}
    />
  );
}
