"use client";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import App, { AppProps } from "@/components/App";

export type ClientProps = Pick<
  AppProps,
  "managers" | "newsList" | "talents" | "topTalents"
>;

export default function Client({
  managers,
  newsList,
  talents,
  topTalents,
}: ClientProps): JSX.Element {
  const handleSubmit = useCallback<AppProps["onSubmit"]>(async (values) => {
    await toast.promise(axios.post("/email", values), {
      error: "送信に失敗しました",
      pending: "送信しています…",
      success: "メッセージを送信しました",
    });
  }, []);

  return (
    <App
      managers={managers}
      newsList={newsList}
      onSubmit={handleSubmit}
      talents={talents}
      topTalents={topTalents}
    />
  );
}
