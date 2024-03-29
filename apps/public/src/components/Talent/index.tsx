"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BlogEntryBlockProps } from "../BlogEntryBlock";
import { BlogBlockProps } from "@/components/BlogBlock";
import TalentBlock, { TalentBlockProps } from "@/components/TalentBlock";
import TalentTop, { TalentTopProps } from "@/components/TalentTop";

export type TalentProps = (
  | Pick<BlogBlockProps, "blogList">
  | Pick<BlogEntryBlockProps, "createdAt" | "title">
) &
  Pick<TalentBlockProps, "talents"> &
  Pick<
    TalentTopProps,
    "height" | "name" | "profile" | "url" | "width" | "iriamUrl" | "twitterUrl"
  > & {
    blogId?: string;
    topTalents: TalentTopProps["talents"];
  };

export default function Talent({
  blogId,
  height,
  iriamUrl,
  name,
  profile,
  talents,
  topTalents,
  twitterUrl,
  url,
  width,
}: TalentProps): JSX.Element {
  const pathname = usePathname();
  const talentBlockPathname = useMemo<TalentBlockProps["pathname"]>(
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
        talents={topTalents}
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
      <div id="talent">
        <TalentBlock pathname={talentBlockPathname} talents={talents} />
      </div>
    </>
  );
}
