"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BlogEntryBlockProps } from "../BlogEntryBlock";
import { BlogBlockProps } from "@/components/BlogBlock";
import ManagerBlock, { ManagerBlockProps } from "@/components/ManagerBlock";
import TalentTop, { TalentTopProps } from "@/components/TalentTop";

export type ManagerProps = (
  | Pick<BlogBlockProps, "blogList">
  | Pick<BlogEntryBlockProps, "createdAt" | "title">
) &
  Pick<ManagerBlockProps, "managers"> &
  Pick<
    TalentTopProps,
    | "height"
    | "iriamUrl"
    | "name"
    | "profile"
    | "talents"
    | "twitterUrl"
    | "url"
    | "width"
  > & {
    blogId?: string;
  };

export default function Manager({
  blogId,
  height,
  iriamUrl,
  managers,
  name,
  profile,
  talents,
  twitterUrl,
  url,
  width,
}: ManagerProps): JSX.Element {
  const pathname = usePathname();
  const talentBlockPathname = useMemo<ManagerBlockProps["pathname"]>(
    () => (blogId ? `${pathname}/blog/${blogId}` : pathname),
    [blogId, pathname],
  );

  return (
    <>
      <TalentTop
        height={height}
        iriamUrl={iriamUrl}
        name={name}
        profile={profile}
        talents={talents}
        twitterUrl={twitterUrl}
        url={url}
        width={width}
      />
      {/* <div id="blog">
        {"blogList" in talentProps ? (
          <BlogBlock blogList={talentProps.blogList} />
        ) : (
          <BlogEntryBlock
            content={talentProps.content}
            createdAt={talentProps.createdAt}
            title={talentProps.title}
          />
        )}
      </div> */}
      <div id="manager">
        <ManagerBlock managers={managers} pathname={talentBlockPathname} />
      </div>
    </>
  );
}
