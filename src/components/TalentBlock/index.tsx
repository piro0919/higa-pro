"use client";
import arraySort from "array-sort";
import capitalize from "capitalize";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useMemo, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import styles from "./style.module.scss";
import Article from "@/components/Article";

const jost = Jost({ subsets: ["latin"], weight: "700" });

type Talent = {
  debut: string;
  furigana: string;
  id: string;
  image?: {
    url: string;
  };
  name: string;
  rank?: 1 | 2 | 3 | 4 | 5;
};

export type TalentBlockProps = {
  talents: Talent[];
};

export default function TalentBlock({
  talents: talentBlockPropTalents,
}: TalentBlockProps): JSX.Element {
  const debutList = useMemo(
    () =>
      Array.from(
        new Set(
          talentBlockPropTalents.map(({ debut }) =>
            dayjs(debut).format("YYYY-MM"),
          ),
        ),
      ).sort(),
    [talentBlockPropTalents],
  );
  const { talentName } = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const activeDebut = useMemo(() => {
    const debut = searchParams.get("debut");

    if (typeof debut === "string") {
      return debut;
    }

    if (typeof talentName === "string") {
      const talent = talentBlockPropTalents.find(
        ({ furigana }) => talentName === furigana,
      );

      if (talent) {
        const { debut } = talent;

        return dayjs(debut).format("YYYY-MM");
      }
    }

    return debutList[0];
  }, [debutList, searchParams, talentBlockPropTalents, talentName]);
  const talents = useMemo(
    () =>
      arraySort(
        talentBlockPropTalents.filter(
          ({ debut }) => dayjs(debut).format("YYYY-MM") === activeDebut,
        ),
        ["image", "furigana"],
      ),
    [activeDebut, talentBlockPropTalents],
  );
  const ref = useRef<HTMLDivElement>(null);
  const entry = useIntersectionObserver(ref, {
    freezeOnceVisible: true,
    rootMargin: "-25%",
  });
  const isLoaded = useMemo(
    () => entry?.isIntersecting,
    [entry?.isIntersecting],
  );

  return (
    <div className={`${styles.wrapper} pattern-zigzag-lg`} ref={ref}>
      <Article heading="TALENT">
        <div className={styles.articleInner}>
          <div className={styles.linksWrapper}>
            {debutList.map((debut) => (
              <Link
                className={`${styles.link} ${
                  activeDebut === debut ? styles.active : ""
                } ${jost.className} pattern-cross-dots-lg`}
                href={queryString.stringifyUrl({
                  query: {
                    debut,
                  },
                  url: `${pathname}#talent`,
                })}
                key={debut}
              >
                <span className={styles.linkText}>
                  {dayjs(debut).format("YYYY.M")}
                </span>
              </Link>
            ))}
          </div>
          <ul className={styles.list}>
            {talents.map(({ furigana, id, image, name }, index) => {
              const children = (
                <motion.div
                  animate={{
                    opacity: isLoaded ? 1 : 0,
                    transform: `translate(${isLoaded ? 0 : 50}%, ${
                      isLoaded ? 0 : 50
                    }%)`,
                  }}
                  className={`${styles.talentBlock} pattern-grid-md`}
                  initial={{ opacity: 0, transform: "translate(50%, 50%)" }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.75,
                    ease: "backOut",
                  }}
                >
                  <div className={styles.talentInner}>
                    <motion.figure
                      animate={{
                        clipPath: `inset(${isLoaded ? 0 : 100}% 0 0 ${
                          isLoaded ? 0 : 100
                        }%)`,
                      }}
                      className={styles.figure}
                      initial={{ clipPath: "inset(100% 0 0 100%)" }}
                      transition={{
                        delay: index * 0.05 + 0.15,
                        duration: 1,
                        ease: "backOut",
                      }}
                    >
                      <Image
                        alt={name}
                        className={styles.image}
                        fill={true}
                        loading="eager"
                        quality={100}
                        src={
                          image?.url
                            ? `${image.url}?h=540&w=540&fit=max`
                            : "/no-data.png"
                        }
                        style={{
                          objectFit: image ? "cover" : "contain",
                        }}
                      />
                    </motion.figure>
                  </div>
                  <motion.div className={styles.nameBlock}>
                    <motion.div
                      animate={{
                        transform: `translate(${isLoaded ? 0 : -200}%, 0)`,
                      }}
                      initial={{ transform: "translate(-200%, 0)" }}
                      transition={{
                        delay: index * 0.1 + 0.175,
                        duration: 0.75,
                        ease: "easeOut",
                      }}
                    >
                      {name}
                    </motion.div>
                  </motion.div>
                  <motion.div className={styles.furiganaBlock}>
                    <motion.div
                      animate={{
                        transform: `translate(${isLoaded ? 0 : 200}%, 0)`,
                      }}
                      initial={{ transform: "translate(200%, 0)" }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        duration: 0.75,
                        ease: "easeOut",
                      }}
                    >
                      {furigana
                        .split("-")
                        .map((v) => capitalize(v))
                        .join(" ")}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );

              return (
                <li key={id}>
                  {image ? (
                    <Link href={`/talents/${furigana}`}>{children}</Link>
                  ) : (
                    children
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </Article>
    </div>
  );
}
