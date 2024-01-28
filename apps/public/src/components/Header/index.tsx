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
          {[
            {
              text: "TOP",
              to: "top",
            },
            {
              text: "ABOUT",
              to: "about",
            },
            {
              text: "NEWS",
              to: "news",
            },
            {
              text: "TALENT",
              to: "talent",
            },
            {
              text: "MANAGER",
              to: "manager",
            },
            {
              text: "CONTACT",
              to: "contact",
            },
          ].map(({ text, to }) => (
            <li key={to}>
              {pathname === "/" ? (
                <Link
                  activeClass={styles.active}
                  className={`${styles.link} ${jost.className}`}
                  hashSpy={true}
                  spy={true}
                  to={to}
                >
                  {text}
                </Link>
              ) : (
                <NextLink
                  className={`${styles.link} ${jost.className}`}
                  href={`/#${to}`}
                >
                  {text}
                </NextLink>
              )}
            </li>
          ))}
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
