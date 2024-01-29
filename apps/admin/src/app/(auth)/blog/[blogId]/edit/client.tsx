"use client";
import { marked } from "marked";
import { useCallback } from "react";
import { updateBlog } from "./actions";
import BlogEdit, { BlogEditProps } from "@/components/BlogEdit";

export type ClientProps = Pick<BlogEditProps, "defaultValues"> & {
  blogId: string;
};

export default function Client({
  blogId,
  defaultValues,
}: ClientProps): JSX.Element {
  const handleSubmit = useCallback<BlogEditProps["onSubmit"]>(
    async ({ content, title }) => {
      await updateBlog({
        content: await marked.parse(content),
        contentId: blogId,
        title,
      });
    },
    [blogId],
  );

  return <BlogEdit defaultValues={defaultValues} onSubmit={handleSubmit} />;
}
