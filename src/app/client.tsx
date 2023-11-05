"use client";
import axios from "axios";
import { useCallback } from "react";
import { toast } from "react-toastify";
import Top, { TopProps } from "@/components/Top";

export type ClientProps = Pick<TopProps, "talents">;

export default function Client({ talents }: ClientProps): JSX.Element {
  const handleSubmit = useCallback<TopProps["onSubmit"]>(async (values) => {
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

  return <Top onSubmit={handleSubmit} talents={talents} />;
}
