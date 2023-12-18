import NoSSR from "@mpth/react-no-ssr";
import { Jost } from "next/font/google";
import Link from "next/link";
import { ComponentProps } from "react";
import ReactModernDrawer from "react-modern-drawer";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  return (
    <NoSSR>
      <ReactModernDrawer
        className={styles.drawer}
        direction="top"
        onClose={onClose}
        open={open}
      >
        <ul className={styles.list}>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/">
              <span onClick={onClose}>TOP</span>
            </Link>
          </li>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/#about">
              <span onClick={onClose}>ABOUT</span>
            </Link>
          </li>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/#news">
              <span onClick={onClose}>NEWS</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/#talents"
            >
              <span onClick={onClose}>TALENT</span>
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/#contact"
            >
              <span onClick={onClose}>CONTACT</span>
            </Link>
          </li>
        </ul>
      </ReactModernDrawer>
    </NoSSR>
  );
}
