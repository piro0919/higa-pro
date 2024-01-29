import { MicroCMSListResponse } from "microcms-js-sdk";
import Client, { ClientProps } from "./client";
import microcmsClient from "@/lib/microcmsClient";

type GetNewsListData = MicroCMSListResponse<MicroCMS.News>;

async function getNewsList(): Promise<GetNewsListData> {
  const response = await microcmsClient.getList<MicroCMS.News>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "news",
    queries: {
      limit: 100,
    },
  });

  return response;
}

type GetTalentListData = MicroCMSListResponse<MicroCMS.Talent>;

async function getTalentList(): Promise<GetTalentListData> {
  const response = await microcmsClient.getList<MicroCMS.Talent>({
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

export default async function Page(): Promise<JSX.Element> {
  const { contents: newsListContents } = await getNewsList();
  const newsList: ClientProps["newsList"] = newsListContents.map(
    ({ content, id, publishedAt, title }) => ({
      content,
      id,
      publishedAt: typeof publishedAt === "string" ? publishedAt : "",
      title,
    }),
  );
  const { contents: talentListContents } = await getTalentList();
  const talents: ClientProps["talents"] = talentListContents
    .filter(({ type }) => type.includes("タレント"))
    .map(({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    }));
  const managers: ClientProps["managers"] = talentListContents
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
  const topTalents: ClientProps["topTalents"] = talentListContents
    .filter(({ images }) => Array.isArray(images) && images.length > 0)
    .map(({ id, images, name, rank }) => ({
      id,
      image: images?.at(0),
      name,
      rank,
    }));

  return (
    <Client
      managers={managers}
      newsList={newsList}
      talents={talents}
      topTalents={topTalents}
    />
  );
}
