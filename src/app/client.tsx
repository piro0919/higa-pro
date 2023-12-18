"use client";
import axios from "axios";
import { useCallback, useMemo } from "react";
import { create } from "react-modal-promise";
import { toast } from "react-toastify";
import App, { AppProps } from "@/components/App";
import NewsModal, { NewsModalProps } from "@/components/NewsModal";

const newsModal = create(NewsModal);

type NewsModalResolve = void;

type News = Omit<AppProps["newsList"][0], "onOpen"> &
  Pick<NewsModalProps<NewsModalResolve>, "content">;

export type ClientProps = Pick<AppProps, "talents"> & {
  newsList: News[];
};

export default function Client({
  newsList: propNewsList,
  talents,
}: ClientProps): JSX.Element {
  const handleSubmit = useCallback<AppProps["onSubmit"]>(async (values) => {
    try {
      await toast.promise(axios.post("/email", values), {
        error: "送信に失敗しました",
        pending: "送信しています…",
        success: "メッセージを送信しました",
      });
    } catch (e) {
      console.error(e);
    }
  }, []);
  const newsList = useMemo<AppProps["newsList"]>(
    () =>
      propNewsList.map(({ content, id, publishedAt, title }) => ({
        id,
        onOpen: async (): Promise<void> => {
          await newsModal({ content });
        },
        publishedAt,
        title,
      })),
    [propNewsList]
  );

  return <App newsList={newsList} onSubmit={handleSubmit} talents={talents} />;
}
