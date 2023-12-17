import { ErrorMessage } from "@hookform/error-message";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import arraySort from "array-sort";
import capitalize from "capitalize";
import dayjs from "dayjs";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spacer from "react-spacer";
import TextareaAutosize from "react-textarea-autosize";
import useAsyncEffect from "use-async-effect";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

const raleway = Raleway({ subsets: ["latin"], weight: "800" });

type FieldValues = {
  content: string;
  email: string;
  name: string;
};

type News = {
  id: string;
  publishedAt: string;
  title: string;
};

type Talent = {
  debut: string;
  furigana: string;
  id: string;
  image?: {
    height: number;
    url: string;
    width: number;
  };
  name: string;
  rank?: 1 | 2 | 3 | 4 | 5;
};

export type AppProps = {
  newsList: News[];
  onSubmit: SubmitHandler<FieldValues>;
  talents: Talent[];
};

export default function App({
  newsList,
  onSubmit,
  talents,
}: AppProps): JSX.Element {
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
  const debutYearAndMonthList = useMemo(
    () =>
      Array.from(
        new Set(talents.map(({ debut }) => dayjs(debut).format("YYYY.MM")))
      ).sort(),
    [talents]
  );
  const [currentDebutYearAndMonth, setCurrentDebutYearAndMonth] = useState(
    debutYearAndMonthList[0]
  );
  const { setTrue: onInit, value: init } = useBoolean(false);

  useAsyncEffect(async () => {
    await initParticlesEngine(async (engine) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await loadSlim(engine);
    });

    onInit();
  });

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.topBlock} pattern-grid-md`}>
        {init ? (
          <Particles
            className={styles.particles}
            options={{
              detectRetina: true,
              fpsLimit: 60,
              fullScreen: false,
              interactivity: {
                events: {
                  resize: { enable: true },
                },
                modes: {
                  push: {
                    quantity: 4,
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4,
                  },
                },
              },
              particles: {
                color: {
                  value: "#fff",
                },
                links: {
                  color: "#fff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    height: 800,
                    width: 800,
                  },
                  value: 80,
                },
                opacity: {
                  value: 0.25,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { max: 5, min: 1 },
                },
              },
            }}
          />
        ) : null}
        <div className={styles.topTalentsWrapper}>
          {talents
            .filter(({ rank }) => typeof rank === "number")
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .sort((a, b) => b.rank! - a.rank!)
            .map(({ image, name, rank }) => (
              <div
                className={styles.topTalentImageWrapper}
                data-rank={rank}
                key={image?.url}
              >
                <div
                  className={styles.topTalentImageBlock}
                  style={{
                    aspectRatio: `${image?.width ?? ""} / ${
                      image?.height ?? ""
                    }`,
                  }}
                >
                  <Image
                    alt={name}
                    className={styles.topTalentImage}
                    fill={true}
                    quality={100}
                    src={image?.url ?? ""}
                  />
                </div>
              </div>
            ))}
        </div>
        <div className={styles.logoBlock}>
          <h1 className={styles.heading1}>Higa Production</h1>
          <Image
            alt="Higa Production"
            className={styles.logoImage}
            fill={true}
            quality={100}
            src="/logo.png"
          />
        </div>
      </div>
      <article className={`${styles.aboutArticle} pattern-diagonal-stripes-lg`}>
        <Spacer grow={1} />
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
        <Spacer grow={1} />
      </article>
      <article className={`${styles.newsArticle} pattern-checks-lg`}>
        <Spacer grow={1} />
        <div className={styles.newsInner}>
          <div className={styles.heading2Block}>
            <h2 className={`${styles.heading2} ${raleway.className}`}>NEWS</h2>
          </div>
          <ul className={styles.newsList}>
            {newsList.map(({ id, publishedAt, title }) => (
              <li key={id}>{`${dayjs(publishedAt).format(
                "YYYY.MM.DD"
              )}：${title}`}</li>
            ))}
          </ul>
        </div>
        <Spacer grow={1} />
      </article>
      <article className={`${styles.talentArticle} pattern-zigzag-lg`}>
        <Spacer grow={1} />
        <div className={styles.talentInner}>
          <div className={styles.heading2Block}>
            <h2 className={`${styles.heading2} ${raleway.className}`}>
              TALENT
            </h2>
          </div>
          <div className={styles.talentWrapper}>
            <div className={styles.debutsWrapper}>
              {debutYearAndMonthList.map((debut) => (
                <button
                  className={`${styles.debutBlock} ${
                    debut === currentDebutYearAndMonth
                      ? styles.currentDebutBlock
                      : ""
                  }`}
                  key={debut}
                  onClick={(): void => {
                    setCurrentDebutYearAndMonth(debut);
                  }}
                >
                  {debut}
                </button>
              ))}
            </div>
            <div
              className={styles.talentsWrapper}
              key={currentDebutYearAndMonth}
            >
              {arraySort(
                talents
                  .filter(
                    ({ debut }) =>
                      dayjs(debut).format("YYYY.MM") ===
                      currentDebutYearAndMonth
                  )
                  // TODO あとで消す
                  .map(({ image, ...talent }) => ({
                    ...talent,
                    image: image?.url.includes("HIGApro") ? undefined : image,
                  })),
                ["image", "furigana"]
              ).map(({ furigana, id, image, name }) => (
                <Link href={`/talents/${furigana}`} key={id}>
                  <div
                    className={`${styles.talentBlock} pattern-cross-dots-lg`}
                  >
                    <div className={styles.talentImageWrapper}>
                      <figure className={styles.talentImageFigure}>
                        {image ? (
                          <Image
                            alt={name}
                            className={styles.talentImage}
                            fill={true}
                            quality={100}
                            src={image?.url}
                          />
                        ) : (
                          <Image
                            alt={name}
                            className={styles.noDataImage}
                            fill={true}
                            quality={100}
                            src="/no-data.png"
                          />
                        )}
                      </figure>
                    </div>
                    <div className={styles.talentNameBlock}>{name}</div>
                    <div className={styles.talentFuriganaBlock}>
                      {furigana
                        .split("-")
                        .map((v) => capitalize(v))
                        .join(" ")}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Spacer grow={1} />
      </article>
      <article className={`${styles.contactArticle} pattern-triangles-lg`}>
        <Spacer grow={1} />
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
        <Spacer grow={1} />
      </article>
    </div>
  );
}
