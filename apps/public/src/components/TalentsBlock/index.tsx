import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import useMeasure from "react-use-measure";
import { useCounter } from "usehooks-ts";
import styles from "./style.module.scss";

type Talent = {
  id: string;
  image: {
    height: number;
    url: string;
    width: number;
  };
  name: string;
};

export type TalentsBlockProps = {
  onIsLoaded?: () => void;
  talents: Talent[];
};

export default function TalentsBlock({
  onIsLoaded,
  talents,
}: TalentsBlockProps): JSX.Element {
  const { count, increment } = useCounter(0);
  const isLoaded = useMemo(
    () => talents && count >= talents.length * 2,
    [count, talents],
  );
  const [ref, { height: wrapperHeight }] = useMeasure();

  useEffect(() => {
    if (!isLoaded || !onIsLoaded) {
      return;
    }

    const timeoutId = setTimeout(
      () => {
        onIsLoaded();
      },
      (talents.length * 0.1 + 0.5) * 1000,
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoaded, onIsLoaded, talents.length]);

  return (
    <div className={styles.wrapper} ref={ref}>
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
                  gridTemplateColumns: `repeat(${talents.length}, min(180px, 30dvw))`,
                }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              >
                {talents.map(
                  ({ id, image: { height, url, width }, name }, index) => (
                    <div className={styles.talentImageBlock} key={id}>
                      <motion.div
                        animate={{
                          transform: `translate(${isLoaded ? 0 : -200}, 0)`,
                        }}
                        className={styles.talentImageInner}
                        initial={{ transform: "translate(-200%, 0)" }}
                        transition={{
                          delay: 0.1 * index + 0.5,
                          duration: 1,
                          ease: "backOut",
                        }}
                      >
                        <div
                          className={styles.talentImageInner2}
                          style={{ width: (wrapperHeight / height) * width }}
                        >
                          <Image
                            alt={name}
                            className={styles.talentImage}
                            fill={true}
                            loading="eager"
                            onLoad={increment}
                            quality={100}
                            src={`${url}?h=${wrapperHeight}&w=${wrapperHeight}&fit=max`}
                          />
                        </div>
                      </motion.div>
                    </div>
                  ),
                )}
              </motion.div>
            ))
        : null}
    </div>
  );
}
