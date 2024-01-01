"use client";
import { motion } from "framer-motion";
import { Jost, Mochiy_Pop_P_One as MochiyPopPOne } from "next/font/google";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";
import TalentsBlock, { TalentsBlockProps } from "@/components/TalentsBlock";

const mochiyPopPOne = MochiyPopPOne({ subsets: ["latin"], weight: "400" });
const jost = Jost({ subsets: ["latin"], weight: "700" });

export type TalentTopProps = Pick<TalentsBlockProps, "talents"> & {
  height: number;
  iriamUrl: string;
  name: string;
  profile: string;
  twitterUrl: string;
  url: string;
  width: number;
};

export default function TalentTop({
  height,
  iriamUrl,
  name,
  profile,
  talents,
  twitterUrl,
  url,
  width,
}: TalentTopProps): JSX.Element {
  const { setTrue: onIsLoaded, value: isLoaded } = useBoolean(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <TalentsBlock talents={talents} />
      </div>
      <div className={`${styles.inner2} pattern-cross-dots-lg`}>
        <motion.div
          animate={{
            opacity: isLoaded ? 1 : 0,
            transform: `translate(${isLoaded ? 0 : 25}dvw, 0)`,
          }}
          className={styles.imageBlock}
          initial={{ opacity: 0, transform: "translate(25dvw, 0)" }}
          style={{ width: `calc(190dvh * ${width / height})` }}
          transition={{
            duration: 0.75,
            ease: "backOut",
          }}
        >
          <Image
            alt={url}
            className={styles.image}
            fill={true}
            onLoad={onIsLoaded}
            quality={100}
            src={url}
          />
        </motion.div>
        <motion.div
          animate={{ transform: `translate(0, ${isLoaded ? 0 : 100}%)` }}
          className={`${styles.messageWrapper} pattern-grid-md`}
          initial={{ transform: "translate(0, 100%)" }}
          transition={{
            duration: 0.75,
            ease: (x: number): number => 1 - Math.pow(1 - x, 4),
          }}
        >
          <div className={styles.messageBlock}>
            <div className={styles.nameBlock}>
              <motion.div
                animate={{ transform: `translate(0, ${isLoaded ? 0 : 100}%)` }}
                className={styles.nameInner}
                initial={{ transform: "translate(0, 100%)" }}
                transition={{
                  delay: 0.1,
                  duration: 0.75,
                  ease: (x: number): number => 1 - Math.pow(1 - x, 4),
                }}
              >
                <h2 className={`${styles.h2} ${mochiyPopPOne.className}`}>
                  {name}
                </h2>
              </motion.div>
            </div>
            <div className={styles.profileWrapper}>
              <div className={styles.profileBlock}>
                <Typewriter
                  onInit={(typewriter): void => {
                    typewriter.typeString(profile).start();
                  }}
                  options={{
                    delay: 25,
                    loop: false,
                  }}
                />
              </div>
              <div className={styles.profileBlock2}>
                <div className={styles.buttonsWrapper}>
                  <motion.button
                    animate={{ scale: isLoaded ? 1 : 0 }}
                    className={`${styles.button} ${jost.className} pattern-cross-dots-lg`}
                    initial={{ scale: 0 }}
                    onClick={(): void => {
                      window.open(iriamUrl, "_blank");
                    }}
                    transition={{
                      delay: 0.2,
                      duration: 0.75,
                      ease: "backOut",
                    }}
                  >
                    <div className={styles.iconBlock}>
                      <Image
                        alt="IRIAM"
                        fill={true}
                        quality={100}
                        src="/iriam.jpg"
                      />
                    </div>
                    <span className={styles.buttonText}>IRIAM</span>
                  </motion.button>
                  <motion.button
                    animate={{ scale: isLoaded ? 1 : 0 }}
                    className={`${styles.button} ${jost.className} pattern-cross-dots-lg`}
                    initial={{ scale: 0 }}
                    onClick={(): void => {
                      window.open(twitterUrl, "_blank");
                    }}
                    transition={{
                      delay: 0.3,
                      duration: 0.75,
                      ease: "backOut",
                    }}
                  >
                    <div className={styles.iconBlock}>
                      <Image
                        alt="Twitter"
                        fill={true}
                        quality={100}
                        src="/twitter.png"
                      />
                    </div>
                    <span className={styles.buttonText}>Twitter</span>
                  </motion.button>
                </div>
                <div className={styles.item}>
                  <Typewriter
                    onInit={(typewriter): void => {
                      typewriter.typeString("デビュー日").start();
                    }}
                    options={{
                      delay: 25,
                      loop: false,
                    }}
                  />
                  <Typewriter
                    onInit={(typewriter): void => {
                      typewriter.typeString("…").start();
                    }}
                    options={{
                      delay: 25,
                      loop: false,
                    }}
                  />
                  <Typewriter
                    onInit={(typewriter): void => {
                      typewriter.typeString("2023.10.1").start();
                    }}
                    options={{
                      delay: 25,
                      loop: false,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
