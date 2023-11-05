import { ErrorMessage } from "@hookform/error-message";
import { Archivo } from "next/font/google";
import Image from "next/image";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Element } from "react-scroll";
import TextareaAutosize from "react-textarea-autosize";
import { useWindowSize } from "usehooks-ts";
import Talents, { TalentsProps } from "../Talents";
import styles from "./style.module.scss";

const archivo = Archivo({ subsets: ["latin"] });

type FieldValues = {
  content: string;
  email: string;
  name: string;
};

export type TopProps = Pick<TalentsProps, "talents"> & {
  onSubmit: SubmitHandler<FieldValues>;
};

export default function Top({ onSubmit, talents }: TopProps): JSX.Element {
  const { height } = useWindowSize();
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      content: "",
      email: "",
      name: "",
    },
  });

  return (
    <>
      <div className={styles.top} style={{ height: `${height * 0.9}px` }}>
        <h1 className={styles.heading1}>HIGApro</h1>
        <div className={styles.logoWrapper}>
          <Image
            alt="HIGApro"
            className={styles.logo}
            fill={true}
            quality={100}
            src="/logo.png"
          />
        </div>
      </div>
      <Element className={styles.element} name="about">
        <article className={`${styles.article} pattern-dots-xl`}>
          <div className={styles.articleInner}>
            <div className={styles.heading2Wrapper}>
              <h2
                className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
              >
                ABOUT
              </h2>
            </div>
            <div className={styles.articleContent}>
              <div className={styles.articleText}>
                HIGApro（ヒガプロ）は、Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
              </div>
            </div>
          </div>
        </article>
      </Element>
      <Element className={styles.element} name="talent">
        <article className={`${styles.article} pattern-zigzag-md`}>
          <Talents talents={talents} />
        </article>
      </Element>
      <Element className={styles.element} name="contact">
        <article className={`${styles.article} pattern-triangles-md`}>
          <div className={styles.articleInner}>
            <div className={styles.heading2Wrapper}>
              <h2
                className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
              >
                CONTACT
              </h2>
            </div>
            <div className={styles.articleContent}>
              <div className={styles.formWrapper}>
                <form
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className={styles.filedsWrapper}>
                    <label className={styles.label}>
                      <span>お名前</span>
                      <input
                        {...register("name", {
                          required: "お名前を入力してください。",
                        })}
                        className={styles.input}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }): ReactNode => (
                          <p className={styles.errorMessage}>{message}</p>
                        )}
                      />
                    </label>
                    <label className={styles.label}>
                      <span>メールアドレス</span>
                      <input
                        {...register("email", {
                          pattern: {
                            message:
                              "正しいメールアドレス形式で入力してください。",
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                          },
                          required: "メールアドレスを入力してください。",
                        })}
                        className={styles.input}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="email"
                        render={({ message }): ReactNode => (
                          <p className={styles.errorMessage}>{message}</p>
                        )}
                      />
                    </label>
                    <label className={styles.label}>
                      <span>ご相談内容</span>
                      <TextareaAutosize
                        {...register("content", {
                          required: "ご相談内容を入力してください。",
                        })}
                        className={styles.textarea}
                        minRows={6}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="content"
                        render={({ message }): ReactNode => (
                          <p className={styles.errorMessage}>{message}</p>
                        )}
                      />
                    </label>
                  </div>
                  <div className={styles.buttonWrapper}>
                    <button className={styles.button} disabled={isSubmitting}>
                      送信する
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </article>
      </Element>
    </>
  );
}
