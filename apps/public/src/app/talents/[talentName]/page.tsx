import { Collection, EntryProps } from "contentful-management";
import {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Talent, { TalentProps } from "@/components/Talent";
import contentfulEnvironment from "@/lib/contentfulEnvironment";
import defaultMetadata from "@/lib/defaultMetadata";
import microcmsClient from "@/lib/microcmsClient";

type GetTalentParams = {
  furigana: string;
};

type GetTalentData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent({
  furigana,
}: GetTalentParams): Promise<GetTalentData> {
  const [contentId] = await microcmsClient.getAllContentIds({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
    filters: `furigana[equals]${furigana}`,
  });
  const response = await microcmsClient.get<
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
  const [contentId] = await microcmsClient.getAllContentIds({
    customRequestInit: {
      next: {
        revalidate: process.env.VERCEL_ENV === "production" ? 60 * 60 : false,
      },
    },
    endpoint: "talents",
    filters: `furigana[equals]${talentName}`,
  });
  const { name, profile } = await microcmsClient.get<
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

type GetBlogParams = {
  id: string;
};

type GetBlogData = EntryProps<Contentful.IBlogFields>;

async function getBlog({ id }: GetBlogParams): Promise<GetBlogData> {
  const entry = (await contentfulEnvironment.getEntry(
    id,
  )) as unknown as EntryProps<Contentful.IBlogFields>;

  return entry;
}

export default async function Page({
  params: { talentName },
  searchParams: { blogId },
}: PageProps): Promise<JSX.Element> {
  const { images, iriamUrl, name, profile, twitterUrl } = await getTalent({
    furigana: talentName,
  });

  if (
    !images ||
    (typeof blogId !== "undefined" && typeof blogId !== "string")
  ) {
    notFound();
  }

  const { height, url, width } = images[0];
  const { contents: talentListContents } = await getTalentList();
  const talents: TalentProps["talents"] = talentListContents.map(
    ({ debut, furigana, id, images, name, rank }) => ({
      debut,
      furigana,
      id,
      image: images?.at(0),
      name,
      rank,
    }),
  );

  if (typeof blogId === "undefined") {
    const { items } = await getBlogList();
    const blogList = items.map(
      ({ fields: { title }, sys: { createdAt, id } }) => ({
        createdAt,
        id,
        title: title.ja || "",
      }),
    );

    return (
      <Talent
        blogList={blogList}
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

  const {
    fields: { content, talentId, title },
    sys: { createdAt },
  } = await getBlog({ id: blogId });

  if (!content.ja || talentName !== talentId.ja) {
    notFound();
  }

  return (
    <Talent
      content={content.ja}
      createdAt={createdAt}
      height={height}
      iriamUrl={iriamUrl}
      name={name}
      profile={profile}
      talents={talents}
      title={title.ja || ""}
      twitterUrl={twitterUrl}
      url={url}
      width={width}
    />
  );
}
