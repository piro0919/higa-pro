import { Jost } from "next/font/google";
import Link from "next/link";
import Spacer from "react-spacer";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export default function Header(): JSX.Element {
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
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/#about">
              ABOUT
            </Link>
          </li>
          <li>
            <Link className={`${styles.link} ${jost.className}`} href="/#news">
              NEWS
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/#talents"
            >
              TALENT
            </Link>
          </li>
          <li>
            <Link
              className={`${styles.link} ${jost.className}`}
              href="/#contact"
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
      <Spacer grow={1} />
    </header>
  );
}
