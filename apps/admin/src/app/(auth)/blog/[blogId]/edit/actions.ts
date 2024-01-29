"use server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import microcmsClient from "@/lib/microcmsClient";

export type UpdateBlogParams = {
  content: string;
  contentId: string;
  title: string;
};

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function updateBlog({
  content,
  contentId,
  title,
}: UpdateBlogParams): Promise<void> {
  const cookieStore = cookies();
  const talentId = cookieStore.get("talentId");

  if (typeof talentId?.value !== "string") {
    notFound();
  }

  await microcmsClient.update<MicroCMS.Blog>({
    content: {
      content,
      talentId: talentId?.value,
      title,
    },
    contentId,
    endpoint: "blogs",
  });
}

export type PostMediaParams = {
  file: string;
};
