"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { ToastContainer } from "react-toastify";
import useMeasure from "react-use-measure";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";
import Drawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps): JSX.Element {
  const [ref, { height }] = useMeasure();
  const {
    setFalse: offIsOpen,
    setTrue: onIsOpen,
    value: isOpen,
  } = useBoolean(false);

  return (
    <>
      <h1 className={styles.h1}>
        Higa Production（ヒガプロダクション）公式サイト
      </h1>
      <div className={styles.wrapper}>
        <div className={styles.headerBlock}>
          <motion.div
            animate={{
              clipPath: `inset(0 ${height > 0 ? 0 : 50}% 0 ${
                height > 0 ? 0 : 50
              }%)`,
            }}
            className={styles.headerBlock2}
            initial={{ clipPath: "inset(0 50% 0 50%)" }}
            ref={ref}
            style={{ marginTop: height / -2 }}
            transition={{
              duration: 0.5,
              ease: (x: number): number => 1 - Math.pow(1 - x, 4),
            }}
          >
            <div className={styles.headerWrapper}>
              <Header />
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={`${styles.button} pattern-cross-dots-lg`}
                onClick={onIsOpen}
              >
                <HamburgerMenu
                  color="#fff"
                  height={18}
                  isOpen={isOpen}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  menuClicked={(): void => {}}
                  width={24}
                />
              </button>
            </div>
          </motion.div>
        </div>
        <main>{children}</main>
        <Footer />
      </div>
      <div className={styles.drawerBlock}>
        <Drawer onClose={offIsOpen} open={isOpen} />
      </div>
      <ToastContainer position="bottom-center" />
    </>
  );
}
