import html2md from "html-to-md";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Client from "./client";
import microcmsClient from "@/lib/microcmsClient";

type GetBlogParams = {
  contentId: string;
};

type GetBlogData = MicroCMS.Blog & MicroCMSContentId & MicroCMSDate;

async function getBlog({ contentId }: GetBlogParams): Promise<GetBlogData> {
  const response = await microcmsClient.get<
    MicroCMS.Blog & MicroCMSContentId & MicroCMSDate
  >({
    contentId,
    customRequestInit: {
      next: {
        revalidate: false,
      },
    },
    endpoint: "blogs",
  });

  return response;
}

export type PageProps = {
  params: { blogId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  params: { blogId },
}: PageProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const cookieTalentId = cookieStore.get("talentId");
  const { content, talentId, title } = await getBlog({ contentId: blogId });

  if (cookieTalentId?.value !== talentId) {
    notFound();
  }

  return (
    <Client
      blogId={blogId}
      defaultValues={{ content: html2md(content), title }}
    />
  );
}
