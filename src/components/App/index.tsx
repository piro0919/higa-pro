import { ErrorMessage } from "@hookform/error-message";
import { Raleway } from "next/font/google";
import Image from "next/image";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spacer from "react-spacer";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./style.module.scss";

const raleway = Raleway({ subsets: ["latin"], weight: "800" });

type FieldValues = {
  content: string;
  email: string;
  name: string;
};

type Talent = {
  furigana: string;
  id: string;
  image: string;
  name: string;
};

export type AppProps = {
  onSubmit: SubmitHandler<FieldValues>;
  talents: Talent[];
};

export default function App({ onSubmit, talents }: AppProps): JSX.Element {
  const {
    formState: { errors },
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
    <div>
      <div className={`${styles.topBlock} pattern-cross-dots-lg`}>
        <div className={styles.logoBlock}>
          <h1 className={styles.heading1}>Higa Production</h1>
          <Image
            alt="Higa Production"
            fill={true}
            quality={100}
            src="/logo.png"
          />
        </div>
      </div>
      <article className={`${styles.aboutArticle} pattern-diagonal-stripes-lg`}>
        <div className={styles.aboutInner}>
          <div className={styles.heading2Block}>
            <h2 className={`${styles.heading2} ${raleway.className}`}>ABOUT</h2>
          </div>
          <p className={styles.description}>
            Higa Production（ヒガプロダクション）は、
            <br />
            Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
          </p>
        </div>
      </article>
      <article className={`${styles.talentArticle} pattern-zigzag-lg`}>
        <div className={styles.talentInner}>
          <div className={styles.heading2Block}>
            <h2 className={`${styles.heading2} ${raleway.className}`}>
              TALENT
            </h2>
          </div>
          <div className={styles.talentsWrapper}>
            {talents.map(({ furigana, image, name }) => (
              <div
                className={`${styles.talentBlock} pattern-cross-dots-lg`}
                key={image}
              >
                <div className={styles.talentImageWrapper}>
                  <div className={styles.talentNameBlock}>{name}</div>
                  <div className={styles.talentFuriganaBlock}>{furigana}</div>
                  <Image
                    alt={name}
                    fill={true}
                    quality={100}
                    src={image}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
      <article className={`${styles.contactArticle} pattern-triangles-lg`}>
        <div className={styles.contactInner}>
          <div className={styles.heading2Block}>
            <h2 className={`${styles.heading2} ${raleway.className}`}>
              CONTACT
            </h2>
          </div>
          <div className={styles.formWrapper}>
            <Spacer />
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.fieldsWrapper}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    お名前
                    <abbr>*</abbr>
                  </label>
                  <input
                    {...register("name", {
                      required: "お名前を入力してください。",
                    })}
                    className={styles.input}
                    id="name"
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
                    メールアドレス
                    <abbr>*</abbr>
                  </label>
                  <input
                    {...register("email", {
                      pattern: {
                        message: "正しいメールアドレス形式で入力してください。",
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                      },
                      required: "メールアドレスを入力してください。",
                    })}
                    className={styles.input}
                    id="email"
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
                  <label className={styles.label} htmlFor="content">
                    ご相談内容
                    <abbr>*</abbr>
                  </label>
                  <TextareaAutosize
                    {...register("content", {
                      required: "ご相談内容を入力してください。",
                    })}
                    className={styles.textarea}
                    id="content"
                    minRows={6}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="content"
                    render={({ message }): ReactNode => (
                      <p className={styles.errorMessage}>{message}</p>
                    )}
                  />
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                <Spacer grow={1} />
                <button className={styles.button} type="submit">
                  送信する
                </button>
                <Spacer grow={1} />
              </div>
            </form>
            <Spacer />
          </div>
        </div>
      </article>
    </div>
  );
}
