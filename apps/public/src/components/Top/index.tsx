"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";
import RankingBlock, { RankingBlockProps } from "@/components/RankingBlock";
import TalentsBlock, { TalentsBlockProps } from "@/components/TalentsBlock";

export type TopProps = Pick<RankingBlockProps, "talents"> &
  Pick<TalentsBlockProps, "talents">;

export default function Top({ talents }: TopProps): JSX.Element {
  const { setTrue: onIsLoaded, value: isLoaded } = useBoolean(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const rankedTalents = talents.filter(({ rank }) => typeof rank === "number");

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.talentsBlockWrapper}>
          <TalentsBlock onIsLoaded={onIsLoaded} talents={talents} />
        </div>
        {isLoaded && rankedTalents.length === 5 ? (
          <motion.div
            animate={{ opacity: isLoaded ? 1 : 0 }}
            className={styles.rankingBlockWrapper}
            initial={{ opacity: 0 }}
          >
            <div className={`${styles.spacer} pattern-grid-md`} />
            <RankingBlock talents={talents} />
            <div className={`${styles.spacer} pattern-grid-md`} />
          </motion.div>
        ) : null}
      </div>
      <div className={`${styles.inner2} pattern-cross-dots-lg`}>
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.imageBlockWrapper}
          initial={{ opacity: 0 }}
          style={{
            backdropFilter: rankedTalents.length === 5 ? "none" : "blur(1px)",
          }}
          transition={{ delay: 2, duration: 0.1, ease: "linear" }}
        >
          <div className={styles.imageBlock}>
            <Image
              alt="Higa Production"
              fill={true}
              quality={100}
              src="/logo.png"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
