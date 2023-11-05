import { CommonBurgerProps, Sling as Hamburger } from "hamburger-react";
import { Saira_Stencil_One as SairaStencilOne } from "next/font/google";
import Link from "next/link";
import { scroller } from "react-scroll";
import Spacer from "react-spacer";
import { useElementSize } from "usehooks-ts";
import styles from "./style.module.scss";

const sairaStencilOne = SairaStencilOne({ subsets: ["latin"], weight: "400" });

export type HeaderProps = Pick<CommonBurgerProps, "toggle" | "toggled"> & {
  onClose: () => void;
};

export default function Header({
  onClose,
  toggle,
  toggled,
}: HeaderProps): JSX.Element {
  const [ref, { height: headerHeight }] = useElementSize();

  return (
    <header
      className={`${styles.header} ${sairaStencilOne.className}`}
      ref={ref}
    >
      <Link
        className={styles.title}
        href="/"
        onClick={(): void => {
          onClose();

          scroller.scrollTo("top", {
            duration: 500,
            offset: headerHeight * -1,
            smooth: true,
          });
        }}
      >
        HIGApro
      </Link>
      <Spacer grow="1" />
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link
              href="/#about"
              onClick={(): void => {
                scroller.scrollTo("about", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href="/#talent"
              onClick={(): void => {
                scroller.scrollTo("talent", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              TALENT
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              onClick={(): void => {
                scroller.scrollTo("contact", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </nav>
      <div className={styles.hamburgerWrapper}>
        <Hamburger toggle={toggle} toggled={toggled} />
      </div>
    </header>
  );
}
