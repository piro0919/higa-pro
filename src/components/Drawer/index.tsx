import NoSSR from "@mpth/react-no-ssr";
import { Jost } from "next/font/google";
import Link from "next/link";
import { ComponentProps, useMemo } from "react";
import ReactModernDrawer from "react-modern-drawer";
import { scroller } from "react-scroll";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const items = useMemo(
    () =>
      [
        {
          name: "ABOUT",
          to: "about",
        },
        {
          name: "NEWS",
          to: "news",
        },
        {
          name: "TALENT",
          to: "talents",
        },
        {
          name: "CONTACT",
          to: "contact",
        },
      ].map(({ name, to }) => (
        <li key={to}>
          <Link
            className={`${styles.link} ${jost.className}`}
            href={`/#${to}`}
            onClick={(): void => {
              scroller.scrollTo(to, {
                smooth: false,
              });
            }}
            scroll={false}
          >
            <span onClick={onClose}>{name}</span>
          </Link>
        </li>
      )),
    [onClose]
  );

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
          {items}
        </ul>
      </ReactModernDrawer>
    </NoSSR>
  );
}
