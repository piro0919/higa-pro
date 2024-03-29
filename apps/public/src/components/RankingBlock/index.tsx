import arraySort from "array-sort";
import { motion } from "framer-motion";
import Image from "next/image";
import useMeasure from "react-use-measure";
import styles from "./style.module.scss";

type Talent = {
  id: string;
  image: {
    height: number;
    url: string;
    width: number;
  };
  name: string;
  rank?: 1 | 2 | 3 | 4 | 5;
};

export type RankingBlockProps = {
  talents: Talent[];
};

export default function RankingBlock({
  talents,
}: RankingBlockProps): JSX.Element {
  const rankedTalents = arraySort(
    talents.filter(({ rank }) => typeof rank === "number"),
    "rank",
  );
  const [ref, { height: wrapperHeight }] = useMeasure();

  return (
    <div className={styles.wrapper} ref={ref}>
      {rankedTalents.map(({ id, image: { url }, name }, index) => {
        const height =
          (wrapperHeight * 2) / 2 ** (Math.ceil((index + 2) / 2) - 1);

        return (
          <motion.div
            animate={{
              clipPath: "inset(0 0 0 0)",
            }}
            className={styles.rankingBlock}
            data-ranking={index + 1}
            initial={{ clipPath: "inset(0 100% 100% 0)" }}
            key={id}
            transition={{
              delay: index * 0.1 + 0.25,
              duration: 1,
              ease: "backOut",
            }}
          >
            <div className={`${styles.rankingBackground} pattern-grid-md`} />
            <div className={styles.imageWrapper}>
              <Image
                alt={name}
                className={styles.image}
                fill={true}
                src={`${url}?h=${height}&w=${height}&fit=max`}
              />
            </div>
            <div className={styles.rankImage}>
              <Image alt="" fill={true} src={`/ranking${index + 1}.png`} />
            </div>
            <div className={styles.nameBlock}>{name}</div>
          </motion.div>
        );
      })}
    </div>
  );
}
