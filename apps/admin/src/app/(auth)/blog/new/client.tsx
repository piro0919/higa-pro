"use client";
import { useCallback } from "react";
import BlogNew, { BlogNewProps } from "@/components/BlogNew";

export default function Client(): JSX.Element {
  const handleSave = useCallback<BlogNewProps["onSave"]>((value) => {
    console.log(value);
  }, []);

  return <BlogNew onSave={handleSave} />;
}
