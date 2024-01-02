import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import i18next from "i18next";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/ja/zod.json";
import styles from "./style.module.scss";
import Article from "@/components/Article";

// eslint-disable-next-line no-void
void i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  subject: z.string().min(1),
  text: z.string().min(1),
});

type FieldTypes = z.infer<typeof schema>;

export type ContactBlockProps = {
  onSubmit: SubmitHandler<FieldTypes>;
};

export default function ContactBlock({
  onSubmit,
}: ContactBlockProps): JSX.Element {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FieldTypes>({
    defaultValues: {
      email: "",
      name: "",
      subject: "",
      text: "",
    },
    resolver: zodResolver(schema),
  });

  return (
    <div className={`${styles.wrapper} pattern-triangles-lg`}>
      <Article heading="CONTACT">
        <div className={styles.articleInner}>
          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.fieldsWrapper}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  お名前<abbr>*</abbr>
                </label>
                <input
                  {...register("name")}
                  className={styles.input}
                  id="name"
                  placeholder="お名前を入力"
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }): ReactNode => (
                    <p className={styles.errorMessage}>{message}</p>
                  )}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">
                  メールアドレス<abbr>*</abbr>
                </label>
                <input
                  {...register("email")}
                  className={styles.input}
                  id="email"
                  placeholder="メールアドレスを入力"
                  type="email"
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }): ReactNode => (
                    <p className={styles.errorMessage}>{message}</p>
                  )}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">
                  件名<abbr>*</abbr>
                </label>
                <input
                  {...register("subject")}
                  className={styles.input}
                  id="subject"
                  placeholder="件名を入力"
                />
                <ErrorMessage
                  errors={errors}
                  name="subject"
                  render={({ message }): ReactNode => (
                    <p className={styles.errorMessage}>{message}</p>
                  )}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="text">
                  ご相談内容<abbr>*</abbr>
                </label>
                <TextareaAutosize
                  {...register("text")}
                  className={styles.textarea}
                  id="text"
                  minRows={6}
                  placeholder="ご相談内容を入力"
                />
                <ErrorMessage
                  errors={errors}
                  name="text"
                  render={({ message }): ReactNode => (
                    <p className={styles.errorMessage}>{message}</p>
                  )}
                />
              </div>
            </div>
            <div className={styles.formFooter}>
              <button className={`${styles.button} pattern-cross-dots-lg`}>
                <span className={styles.buttonInner}>送信する</span>
              </button>
            </div>
          </form>
        </div>
      </Article>
    </div>
  );
}
