"use client";
import { useCallback } from "react";
import App, { AppProps } from "@/components/App";

export type ClientProps = Pick<AppProps, "newsList" | "talents">;

export default function Client({
  newsList,
  talents,
}: ClientProps): JSX.Element {
  const handleSubmit = useCallback<AppProps["onSubmit"]>((values) => {
    console.log(values);
  }, []);

  return <App newsList={newsList} onSubmit={handleSubmit} talents={talents} />;
}
