"use client";
import arraySort from "array-sort";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { Jost } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
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
  pathname: string;
  talents: Talent[];
};

export default function TalentBlock({
  pathname,
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
  const { talentId } = useParams();
  const searchParams = useSearchParams();
  const activeDebut = useMemo(() => {
    const debut = searchParams.get("debut");
    const type = searchParams.get("type");

    if (typeof debut === "string" && type === "talent") {
      return debut;
    }

    if (typeof talentId === "string") {
      const talent = talentBlockPropTalents.find(({ id }) => talentId === id);

      if (talent) {
        const { debut } = talent;

        return dayjs(debut).format("YYYY-MM");
      }
    }

    return debutList[0];
  }, [debutList, searchParams, talentBlockPropTalents, talentId]);
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
  const { inView, ref } = useInView({
    rootMargin: "-25% 0px -25% 0px",
    triggerOnce: true,
  });

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
                    type: "talent",
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
                    opacity: inView ? 1 : 0,
                    transform: `translate(${inView ? 0 : 50}%, ${
                      inView ? 0 : 50
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
                        clipPath: `inset(${inView ? 0 : 100}% 0 0 ${
                          inView ? 0 : 100
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
                        transform: `translate(${inView ? 0 : -200}%, 0)`,
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
                        transform: `translate(${inView ? 0 : 200}%, 0)`,
                      }}
                      initial={{ transform: "translate(200%, 0)" }}
                      transition={{
                        delay: index * 0.1 + 0.2,
                        duration: 0.75,
                        ease: "easeOut",
                      }}
                    >
                      {furigana}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );

              return (
                <li key={id}>
                  {image ? (
                    <Link href={`/talents/${id}`}>{children}</Link>
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
