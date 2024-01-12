import { Collection, EntryProps } from "contentful-management";
import Blog, { BlogProps } from "@/components/Blog";
import contentfulEnvironment from "@/lib/contentfulEnvironment";

type GetBlogListData = Collection<
  EntryProps<Contentful.IBlogFields>,
  EntryProps<Contentful.IBlogFields>
>;

async function getBlogList(): Promise<GetBlogListData> {
  const entries = (await contentfulEnvironment.getEntries({
    content_type: "blog",
    select: "fields.title,sys.createdAt,sys.id",
  })) as unknown as Collection<
    EntryProps<Contentful.IBlogFields>,
    EntryProps<Contentful.IBlogFields>
  >;

  return entries;
}

export default async function Page(): Promise<JSX.Element> {
  const { items } = await getBlogList();
  const blogList: BlogProps["blogList"] = items.map(
    ({ fields: { title }, sys: { createdAt, id } }) => ({
      createdAt,
      id,
      title: title.ja || "",
    }),
  );

  return <Blog blogList={blogList} />;
}
