import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./style.module.scss";
import TalentsBlock, { TalentsBlockProps } from "@/components/TalentsBlock";

export type TopProps = Pick<TalentsBlockProps, "talents">;

export default function Top({ talents }: TopProps): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <TalentsBlock talents={talents} />
      </div>
      <div className={`${styles.inner2} pattern-cross-dots-lg`}>
        <motion.div
          animate={{ opacity: 1 }}
          className={styles.imageBlockWrapper}
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 0.1, ease: "linear" }}
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
