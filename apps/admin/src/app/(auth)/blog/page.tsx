import Blog, { BlogProps } from "@/components/Blog";
import microcmsClient from "@/lib/microcmsClient";
import { MicroCMSListResponse } from "microcms-js-sdk";

type GetBlogListData = MicroCMSListResponse<MicroCMS.Blog>;

async function getBlogList(): Promise<GetBlogListData> {
  const response = await microcmsClient.getList<MicroCMS.Blog>({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "blogs",
    queries: {
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
