import { MicroCMSListResponse } from "microcms-js-sdk";
import Client, { ClientProps } from "./client";
import client from "@/lib/client";

type GetNewsListData = MicroCMSListResponse<MicroCMS.News>;

async function getNewsList(): Promise<GetNewsListData> {
  const response = await client.getList<MicroCMS.News>({
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
  const talents: ClientProps["talents"] = talentListContents.map(
    ({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    }),
  );

  return <Client newsList={newsList} talents={talents} />;
}
