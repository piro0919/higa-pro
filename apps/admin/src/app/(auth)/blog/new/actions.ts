"use server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import microcmsClient from "@/lib/microcmsClient";

export type CreateBlogParams = {
  content: string;
  title: string;
};

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function createBlog({
  content,
  title,
}: CreateBlogParams): Promise<void> {
  const cookieStore = cookies();
  const talentId = cookieStore.get("talentId");

  if (typeof talentId?.value !== "string") {
    notFound();
  }

  await microcmsClient.create<MicroCMS.Blog>({
    content: {
      content,
      talentId: talentId.value,
      title,
    },
    endpoint: "blogs",
  });
}
