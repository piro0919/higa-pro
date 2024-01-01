"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import shuffle from "shuffle-array";
import { useCounter } from "usehooks-ts";
import styles from "./style.module.scss";

type Talent = {
  id: string;
  image: {
    url: string;
  };
  name: string;
};

export type TalentsBlockProps = {
  talents: Talent[];
};

export default function TalentsBlock({
  talents: talentsBlockPropTalents,
}: TalentsBlockProps): JSX.Element {
  const { count, increment } = useCounter(0);
  const [talents, setTalents] = useState<typeof talentsBlockPropTalents>();
  const isLoaded = useMemo(
    () => talents && count === talents.length * 2,
    [count, talents],
  );

  useEffect(() => {
    setTalents(shuffle(talentsBlockPropTalents));
  }, [talentsBlockPropTalents]);

  return (
    <div className={styles.wrapper}>
      {talents
        ? Array(2)
            .fill(undefined)
            .map((_, index) => (
              <motion.div
                animate={{ transform: "translate(-100%, 0)" }}
                className={styles.talentsWrapper}
                initial={{ transform: "translate(0, 0)" }}
                key={index}
                style={{
                  gridTemplateColumns: `repeat(${talents.length}, min(180px, 25dvw))`,
                }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              >
                {talents.map(({ id, image: { url }, name }, index) => (
                  <div className={styles.talentImageBlock} key={id}>
                    <motion.div
                      animate={{
                        transform: `translate(${isLoaded ? 0 : -200}, 0)`,
                      }}
                      className={styles.talentImageInner}
                      initial={{ transform: "translate(-200%, 0)" }}
                      transition={{
                        delay: 0.1 * index,
                        duration: 1,
                        ease: "backOut",
                      }}
                    >
                      <Image
                        alt={name}
                        className={styles.talentImage}
                        fill={true}
                        loading="eager"
                        onLoad={increment}
                        quality={100}
                        src={url}
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))
        : null}
    </div>
  );
}
