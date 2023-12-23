"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import arraySort from "array-sort";
import capitalize from "capitalize";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import { Jost, Raleway, Rampart_One as RampartOne } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useEffect, useMemo } from "react";
import { Element, scroller } from "react-scroll";
import Spacer from "react-spacer";
import useAsyncEffect from "use-async-effect";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

const raleway = Raleway({ subsets: ["latin"], weight: "800" });
const jost = Jost({ subsets: ["latin"], weight: "700" });
const rampartOne = RampartOne({
  subsets: ["latin"],
  weight: "400",
});

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

export type TalentProps = {
  debut: string;
  furigana: string;
  image?: {
    height: number;
    url: string;
    width: number;
  };
  iriamUrl: string;
  name: string;
  profile: string;
  rank?: 1 | 2 | 3 | 4 | 5;
  talents: Talent[];
  twitterUrl: string;
};

export default function Talent({
  debut,
  furigana,
  image,
  iriamUrl,
  name,
  profile,
  talents,
  twitterUrl,
}: TalentProps): JSX.Element {
  const { setTrue: onInit, value: init } = useBoolean(false);
  const { setTrue: onLoaded, value: loaded } = useBoolean(false);
  const debutYearAndMonthList = useMemo(
    () =>
      Array.from(
        new Set(talents.map(({ debut }) => dayjs(debut).format("YYYY.MM")))
      ).sort(),
    [talents]
  );
  const router = useRouter();
  const searchParams = useSearchParams();

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
    <div>
      <div className={`${styles.wrapper} pattern-grid-md`}>
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
                  value: "#6777ff",
                },
                links: {
                  color: "#6777ff",
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
        <div className={styles.talentWrapper}>
          <motion.div
            animate={{ scale: loaded ? 1 : 0 }}
            className={styles.talentImageWrapper}
            initial={{ scale: 0 }}
            transition={{
              duration: 0.5,
              ease: "backOut",
            }}
          >
            {image &&
            // TODO あとで消す
            !image?.url.includes("HIGApro") ? (
              <Image
                alt={name}
                className={styles.talentImage}
                fill={true}
                onLoad={onLoaded}
                quality={100}
                src={image.url}
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
          </motion.div>
          <div className={styles.nameWrapper}>
            <motion.div
              animate={{ scale: loaded ? 1 : 0 }}
              className={styles.nameInner}
              initial={{ scale: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
            >
              <div className={`${styles.nameBlock} ${rampartOne.className}`}>
                <h1 className={styles.heading1}>{name}</h1>
                <span>{name}</span>
              </div>
              <div className={styles.furiganaBlock}>
                {furigana
                  .split("-")
                  .map((v) => capitalize(v))
                  .join(" ")}
              </div>
            </motion.div>
          </div>
        </div>
        <div className={styles.detailWrapper}>
          <div className={styles.detailInner}>
            <div className={styles.profileBlock}>{parse(profile)}</div>
            <hr className={styles.hr} />
            <div>
              <dl className={styles.detailList}>
                <dt className={styles.detailTerm}>デビュー日</dt>
                <dd>{dayjs(debut).format("YYYY年M月D日")}</dd>
              </dl>
              <div className={styles.buttonsWrapper}>
                <button
                  className={`${styles.button} pattern-cross-dots-lg`}
                  onClick={(): void => {
                    window.open(iriamUrl, "_blank");
                  }}
                >
                  <span className={`${styles.buttonText} ${jost.className}`}>
                    IRIAM
                  </span>
                </button>
                <button
                  className={`${styles.button} pattern-cross-dots-lg`}
                  onClick={(): void => {
                    window.open(twitterUrl, "_blank");
                  }}
                >
                  <span className={`${styles.buttonText} ${jost.className}`}>
                    X
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <div className={styles.talentWrapper2}>
              <div className={styles.debutsWrapper}>
                {debutYearAndMonthList.map((debutYearAndMonth) => (
                  <button
                    className={`${styles.debutBlock} ${
                      debutYearAndMonth ===
                      (searchParams.get("debut")?.replace("-", ".") ||
                        dayjs(debut).format("YYYY.MM"))
                        ? styles.currentDebutBlock
                        : ""
                    }`}
                    key={debutYearAndMonth}
                    onClick={(): void => {
                      router.push(
                        `${queryString.stringifyUrl({
                          query: {
                            debut: debutYearAndMonth.replace(".", "-"),
                          },
                          url: `/talents/${furigana}`,
                        })}#talents`
                      );
                    }}
                  >
                    {debutYearAndMonth}
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
                      ({ debut: talentDebut }) =>
                        dayjs(talentDebut).format("YYYY.MM") ===
                        (searchParams.get("debut")?.replace("-", ".") ||
                          dayjs(debut).format("YYYY.MM"))
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
                      <div className={styles.talentImageWrapper2}>
                        <figure className={styles.talentImageFigure}>
                          {image ? (
                            <Image
                              alt={name}
                              className={styles.talentImage2}
                              fill={true}
                              quality={100}
                              src={image?.url}
                            />
                          ) : (
                            <Image
                              alt={name}
                              className={styles.noDataImage2}
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
    </div>
  );
}
