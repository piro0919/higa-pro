import { CommonBurgerProps, Sling as Hamburger } from "hamburger-react";
import { Saira_Stencil_One as SairaStencilOne } from "next/font/google";
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
  const [ref, { height }] = useElementSize();

  return (
    <header
      className={`${styles.header} ${sairaStencilOne.className}`}
      ref={ref}
    >
      <a
        className={styles.title}
        onClick={(): void => {
          onClose();

          scroller.scrollTo("top", {
            duration: 500,
            offset: height * -1,
            smooth: true,
          });
        }}
      >
        HIGApro
      </a>
      <Spacer grow="1" />
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <a
              onClick={(): void => {
                scroller.scrollTo("about", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              ABOUT
            </a>
          </li>
          <li>
            <a
              onClick={(): void => {
                scroller.scrollTo("talent", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              TALENT
            </a>
          </li>
          <li>
            <a
              onClick={(): void => {
                scroller.scrollTo("contact", {
                  duration: 500,
                  offset: -64,
                  smooth: true,
                });
              }}
            >
              CONTACT
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.hamburgerWrapper}>
        <Hamburger toggle={toggle} toggled={toggled} />
      </div>
    </header>
  );
}
