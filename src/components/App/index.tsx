import { ErrorMessage } from "@hookform/error-message";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import arraySort from "array-sort";
import capitalize from "capitalize";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Raleway } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { MouseEventHandler, ReactNode, useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Element, scroller } from "react-scroll";
import Spacer from "react-spacer";
import TextareaAutosize from "react-textarea-autosize";
import useAsyncEffect from "use-async-effect";
import { useBoolean, useCounter } from "usehooks-ts";
import styles from "./style.module.scss";

const raleway = Raleway({ subsets: ["latin"], weight: "800" });

type FieldValues = {
  content: string;
  email: string;
  name: string;
};

type News = {
  id: string;
  onOpen: MouseEventHandler<HTMLButtonElement>;
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
  const { setTrue: onInit, value: init } = useBoolean(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { count, increment } = useCounter(0);

  useAsyncEffect(async () => {
    await initParticlesEngine(async (engine) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await loadSlim(engine);
    });

    onInit();
  });

  useEffect(() => {
    const to = window.location.hash.replace("#", "");

    if (!to) {
      return;
    }

    scroller.scrollTo(to, {
      smooth: false,
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.topBlock} pattern-grid-md`}>
        {init ? (
          <Particles
            className={styles.particles}
            key="particles"
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
            .map(({ image, name, rank }, index) => (
              <div
                className={styles.topTalentImageWrapper}
                data-rank={rank}
                key={image?.url}
              >
                <motion.div
                  animate={{ scale: count === 5 ? 1 : 0 }}
                  className={styles.topTalentImageBlock}
                  initial={{ scale: 0 }}
                  style={{
                    aspectRatio: `${image?.width ?? ""} / ${
                      image?.height ?? ""
                    }`,
                  }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.5,
                    ease: "backOut",
                  }}
                >
                  <Image
                    alt={name}
                    className={styles.topTalentImage}
                    fill={true}
                    onLoad={increment}
                    quality={100}
                    src={image?.url ?? ""}
                  />
                </motion.div>
              </div>
            ))}
        </div>
        <motion.div
          animate={{
            scale:
              count ===
              talents.filter(({ rank }) => typeof rank === "number").length
                ? 1
                : 0,
          }}
          className={styles.logoBlock}
          initial={{ scale: 0 }}
          transition={{
            delay: 0.1 * 6,
            duration: 0.5,
            ease: "backOut",
          }}
        >
          <h1 className={styles.heading1}>Higa Production</h1>
          <Image
            alt="Higa Production"
            className={styles.logoImage}
            fill={true}
            quality={100}
            src="/logo.png"
          />
        </motion.div>
      </div>
      <Element name="about">
        <article
          className={`${styles.aboutArticle} pattern-diagonal-stripes-lg`}
        >
          <Spacer grow={1} />
          <div className={styles.aboutInner}>
            <motion.div
              className={styles.heading2Block}
              initial={{ width: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "circInOut" }}
              viewport={{ once: true }}
              whileInView={{ width: "100%" }}
            >
              <h2 className={`${styles.heading2} ${raleway.className}`}>
                ABOUT
              </h2>
            </motion.div>
            <p className={styles.description}>
              Higa Production（ヒガプロダクション）は、
              <br />
              Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
            </p>
          </div>
          <Spacer grow={1} />
        </article>
      </Element>
      <Element name="news">
        <article className={`${styles.newsArticle} pattern-checks-lg`}>
          <Spacer grow={1} />
          <div className={styles.newsInner}>
            <motion.div
              className={styles.heading2Block}
              initial={{ width: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "circInOut" }}
              viewport={{ once: true }}
              whileInView={{ width: "100%" }}
            >
              <h2 className={`${styles.heading2} ${raleway.className}`}>
                NEWS
              </h2>
            </motion.div>
            <ul className={styles.newsList}>
              {newsList.map(({ id, onOpen, publishedAt, title }) => (
                <li key={id}>
                  <button className={styles.newsButton} onClick={onOpen}>
                    {`${dayjs(publishedAt).format("YYYY.MM.DD")}：${title}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Spacer grow={1} />
        </article>
      </Element>
      <Element name="talents">
        <article className={`${styles.talentArticle} pattern-zigzag-lg`}>
          <Spacer grow={1} />
          <div className={styles.talentInner}>
            <motion.div
              className={styles.heading2Block}
              initial={{ width: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "circInOut" }}
              viewport={{ once: true }}
              whileInView={{ width: "100%" }}
            >
              <h2 className={`${styles.heading2} ${raleway.className}`}>
                TALENT
              </h2>
            </motion.div>
            <div className={styles.talentWrapper}>
              <div className={styles.debutsWrapper}>
                {debutYearAndMonthList.map((debut) => (
                  <button
                    className={`${styles.debutBlock} ${
                      debut ===
                      (searchParams.get("debut")?.replace("-", ".") ||
                        debutYearAndMonthList[0])
                        ? styles.currentDebutBlock
                        : ""
                    }`}
                    key={debut}
                    onClick={(): void => {
                      router.push(
                        `${queryString.stringifyUrl({
                          query: {
                            debut: debut.replace(".", "-"),
                          },
                          url: "/",
                        })}#talents`
                      );
                    }}
                  >
                    {debut}
                  </button>
                ))}
              </div>
              <div
                className={styles.talentsWrapper}
                key={searchParams.get("debut") || debutYearAndMonthList[0]}
              >
                {arraySort(
                  talents
                    .filter(
                      ({ debut }) =>
                        dayjs(debut).format("YYYY.MM") ===
                        (searchParams.get("debut")?.replace("-", ".") ||
                          debutYearAndMonthList[0])
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
      </Element>
      <Element name="contact">
        <article className={`${styles.contactArticle} pattern-triangles-lg`}>
          <Spacer grow={1} />
          <div className={styles.contactInner}>
            <motion.div
              className={styles.heading2Block}
              initial={{ width: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "circInOut" }}
              viewport={{ once: true }}
              whileInView={{ width: "100%" }}
            >
              <h2 className={`${styles.heading2} ${raleway.className}`}>
                CONTACT
              </h2>
            </motion.div>
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
                          message:
                            "正しいメールアドレス形式で入力してください。",
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
      </Element>
    </div>
  );
}
