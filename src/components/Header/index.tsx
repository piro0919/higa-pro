import { Jost } from "next/font/google";
import Link from "next/link";
import { useMemo } from "react";
import { scroller } from "react-scroll";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export default function Header(): JSX.Element {
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
            {name}
          </Link>
        </li>
      )),
    []
  );

  return (
    <header className={`${styles.header} pattern-cross-dots-lg`}>
      <Spacer grow={1} />
      <nav>
        <ul className={styles.list}>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/">
              TOP
            </Link>
          </li>
          {items}
        </ul>
      </nav>
      <Spacer grow={1} />
    </header>
  );
}
