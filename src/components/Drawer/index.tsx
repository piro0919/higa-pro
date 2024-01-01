import NoSSR from "@mpth/react-no-ssr";
import usePrevious from "@react-hook/previous";
import { Jost } from "next/font/google";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, useEffect } from "react";
import ReactModernDrawer from "react-modern-drawer";
import { Link } from "react-scroll";
import styles from "./style.module.scss";

const jost = Jost({ subsets: ["latin"], weight: "700" });

export type DrawerProps = Pick<
  ComponentProps<typeof ReactModernDrawer>,
  "onClose" | "open"
>;

export default function Drawer({ onClose, open }: DrawerProps): JSX.Element {
  const pathname = usePathname();
  const prevPathname = usePrevious(pathname);

  useEffect(() => {
    if (!onClose || pathname === prevPathname) {
      return;
    }

    onClose();
  }, [onClose, pathname, prevPathname]);

  return (
    <NoSSR>
      <ReactModernDrawer direction="top" onClose={onClose} open={open}>
        <div className={`${styles.navWrapper} pattern-cross-dots-lg`}>
          <nav>
            <ul className={styles.list}>
              <li>
                {pathname === "/" ? (
                  <Link
                    activeClass={styles.active}
                    className={`${styles.link} ${jost.className}`}
                    hashSpy={true}
                    onClick={onClose}
                    spy={true}
                    to="top"
                  >
                    TOP
                  </Link>
                ) : (
                  <NextLink
                    className={`${styles.link} ${jost.className}`}
                    href="/"
                  >
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
                    onClick={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
                    onClick={onClose}
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
        </div>
      </ReactModernDrawer>
    </NoSSR>
  );
}
