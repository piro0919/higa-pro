import { motion } from "framer-motion";
import { Raleway } from "next/font/google";
import { ReactNode } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./style.module.scss";

const raleway = Raleway({ subsets: ["latin"], weight: "800" });

export type ArticleProps = {
  children: ReactNode;
  heading: string;
};

export default function Article({
  children,
  heading,
}: ArticleProps): JSX.Element {
  const { inView, ref } = useInView({
    rootMargin: "0px 0px -25% 0px",
  });

  return (
    <article className={styles.article} ref={ref}>
      <motion.div
        animate={{ width: `${inView ? 100 : 0}%` }}
        className={styles.h2Block}
        initial={{ width: 0 }}
        transition={{ duration: 0.5, ease: "circInOut" }}
      >
        <h2 className={`${styles.h2} ${raleway.className}`}>{heading}</h2>
      </motion.div>
      <motion.div
        animate={{ opacity: inView ? 1 : 0 }}
        className={styles.content}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.1, ease: "linear" }}
      >
        {children}
      </motion.div>
    </article>
  );
}
