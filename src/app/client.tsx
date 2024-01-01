"use client";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import App, { AppProps } from "@/components/App";

export type ClientProps = Pick<AppProps, "newsList" | "talents">;

export default function Client({
  newsList,
  talents,
}: ClientProps): JSX.Element {
  const handleSubmit = useCallback<AppProps["onSubmit"]>(async (values) => {
    await toast.promise(axios.post("/email", values), {
      error: "送信に失敗しました",
      pending: "送信しています…",
      success: "メッセージを送信しました",
    });
  }, []);

  return <App newsList={newsList} onSubmit={handleSubmit} talents={talents} />;
}
