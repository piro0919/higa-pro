"use client";
import NoSSR from "@mpth/react-no-ssr";
import MDEditor from "@uiw/react-md-editor";
import { useCallback } from "react";
import Spacer from "react-spacer";
import rehypeSanitize from "rehype-sanitize";
import { useLocalStorage } from "usehooks-ts";
import Button, { ButtonProps } from "../Button";
import styles from "./style.module.scss";
import useHeaderStore from "@/stores/useHeaderStore";

export default function BlogNew(): JSX.Element {
  const headerHeight = useHeaderStore(({ height }) => height);
  const [value, setValue] = useLocalStorage("blog", "");
  const handleClick = useCallback<NonNullable<ButtonProps["onClick"]>>(() => {
    setValue("");
  }, [setValue]);

  return (
    <div
      className={styles.wrapper}
      style={{ height: `calc(100dvh - ${headerHeight}px)` }}
    >
      <div className={styles.topBlock}>
        <Spacer grow={1} />
        <Button onClick={handleClick}>保存する</Button>
      </div>
      <NoSSR>
        <MDEditor
          className={styles.editor}
          height="100%"
          onChange={(value): void => {
            if (typeof value !== "string") {
              return;
            }

            setValue(value);
          }}
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          value={value}
        />
      </NoSSR>
    </div>
  );
}
