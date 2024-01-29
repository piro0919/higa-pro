import { MicroCMSListResponse } from "microcms-js-sdk";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Blog, { BlogProps } from "@/components/Blog";
import microcmsClient from "@/lib/microcmsClient";

type GetBlogListData = MicroCMSListResponse<MicroCMS.Blog>;

async function getBlogList(): Promise<GetBlogListData> {
  const cookieStore = cookies();
  const talentId = cookieStore.get("talentId");

  if (typeof talentId?.value !== "string") {
    notFound();
  }

  const response = await microcmsClient.getList<MicroCMS.Blog>({
    customRequestInit: {
      next: {
        revalidate: false,
      },
    },
    endpoint: "blogs",
    queries: {
      filters: `talentId[equals]${talentId.value}`,
      limit: 100,
    },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { contents: blogListContents } = await getBlogList();
  const blogList: BlogProps["blogList"] = blogListContents.map(
    ({ createdAt, id, title }) => ({
      createdAt,
      id,
      title,
    }),
  );

  return <Blog blogList={blogList} />;
}
