"use client";
import { marked } from "marked";
import { useCallback } from "react";
import { createBlog } from "./actions";
import { BlogEditProps } from "@/components/BlogEdit";
import BlogNew from "@/components/BlogNew";

export default function Client(): JSX.Element {
  const handleSubmit = useCallback<BlogEditProps["onSubmit"]>(
    async ({ content, title }) => {
      await createBlog({
        content: await marked.parse(content),
        title,
      });
    },
    [],
  );

  return <BlogNew onSubmit={handleSubmit} />;
}
