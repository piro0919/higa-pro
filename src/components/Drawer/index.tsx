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
              TOP
            </Link>
          </li>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/news">
              NEWS
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/talents"
            >
              TALENT
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/contact"
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </ReactModernDrawer>
    </NoSSR>
  );
}
