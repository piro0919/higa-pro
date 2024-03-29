import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Spacer from "react-spacer";
import rehypeSanitize from "rehype-sanitize";
import { useEffectOnce, useInterval, useLocalStorage } from "usehooks-ts";
import z from "zod";
import Button from "../Button";
import styles from "./style.module.scss";
import useHeaderStore from "@/stores/useHeaderStore";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
const schema = z.object({
  content: z.string().min(1),
  title: z.string().min(1),
});

type Schema = z.infer<typeof schema>;

export type BlogNewProps = {
  onSubmit: SubmitHandler<Schema>;
};

export default function BlogNew({ onSubmit }: BlogNewProps): JSX.Element {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<Schema>({
    defaultValues: {
      content: "",
      title: "",
    },
    resolver: zodResolver(schema),
  });
  const headerHeight = useHeaderStore(({ height }) => height);
  const [blog, setBlog] = useLocalStorage("blog", "");

  useInterval(() => {
    setBlog(watch("content"));
  }, 10000);

  useEffectOnce(() => {
    setValue("content", blog);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={styles.wrapper}
        style={{ height: `calc(100dvh - ${headerHeight}px)` }}
      >
        <div className={styles.topBlock}>
          <Spacer grow={1} />
          <Button disabled={!isValid} type="submit">
            保存する
          </Button>
        </div>
        <input
          {...register("title")}
          className={styles.input}
          placeholder="タイトル"
        />
        <Controller
          control={control}
          name="content"
          render={({ field }): JSX.Element => (
            <MDEditor
              {...field}
              className={styles.editor}
              height="100%"
              preview="edit"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            />
          )}
        />
      </div>
    </form>
  );
}
