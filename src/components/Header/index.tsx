import { Jost } from "next/font/google";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Link } from "react-scroll";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export default function Header(): JSX.Element {
  const pathname = usePathname();

  return (
    <header className={`${styles.header} pattern-cross-dots-lg`}>
      <nav>
        <ul className={styles.list}>
          <li>
            {pathname === "/" ? (
              <Link
                activeClass={styles.active}
                className={`${styles.link} ${jost.className}`}
                hashSpy={true}
                spy={true}
                to="top"
              >
                TOP
              </Link>
            ) : (
              <NextLink className={`${styles.link} ${jost.className}`} href="/">
                TOP
              </NextLink>
            )}
          </li>
          <li>
            {pathname === "/" ? (
              <Link
                activeClass={styles.active}
                className={`${styles.link} ${jost.className}`}
                hashSpy={true}
                spy={true}
                to="about"
              >
                ABOUT
              </Link>
            ) : (
              <NextLink
                className={`${styles.link} ${jost.className}`}
                href="/#about"
              >
                ABOUT
              </NextLink>
            )}
          </li>
          <li>
            {pathname === "/" ? (
              <Link
                activeClass={styles.active}
                className={`${styles.link} ${jost.className}`}
                hashSpy={true}
                spy={true}
                to="news"
              >
                NEWS
              </Link>
            ) : (
              <NextLink
                className={`${styles.link} ${jost.className}`}
                href="/#news"
              >
                NEWS
              </NextLink>
            )}
          </li>
          <li>
            {pathname === "/" ? (
              <Link
                activeClass={styles.active}
                className={`${styles.link} ${jost.className}`}
                hashSpy={true}
                spy={true}
                to="talent"
              >
                TALENT
              </Link>
            ) : (
              <NextLink
                className={`${styles.link} ${jost.className}`}
                href="/#talent"
              >
                TALENT
              </NextLink>
            )}
          </li>
          <li>
            {pathname === "/" ? (
              <Link
                activeClass={styles.active}
                className={`${styles.link} ${jost.className}`}
                hashSpy={true}
                spy={true}
                to="contact"
              >
                CONTACT
              </Link>
            ) : (
              <NextLink
                className={`${styles.link} ${jost.className}`}
                href="/#contact"
              >
                CONTACT
              </NextLink>
            )}
          </li>
        </ul>
      </nav>
      <a href="https://twitter.com/HIGA_pro_0608" target="_blank">
        <div className={styles.iconBlock}>
          <Image alt="Twitter" fill={true} quality={100} src="/twitter.png" />
        </div>
      </a>
    </header>
  );
}
