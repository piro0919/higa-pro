"use client";
import { useCallback } from "react";
import App, { AppProps } from "@/components/App";

export type ClientProps = Pick<AppProps, "talents">;

export default function Client({ talents }: ClientProps): JSX.Element {
  const handleSubmit = useCallback<AppProps["onSubmit"]>((values) => {
    console.log(values);
  }, []);

  return <App onSubmit={handleSubmit} talents={talents} />;
}
