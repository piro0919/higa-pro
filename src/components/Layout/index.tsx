"use client";
import { Saira_Stencil_One as SairaStencilOne } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import { Element, scroller } from "react-scroll";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";
import { useBoolean, useElementSize } from "usehooks-ts";
import DrawerMenu from "../DrawerMenu";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.scss";

const sairaStencilOne = SairaStencilOne({ subsets: ["latin"], weight: "400" });

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { setFalse: closeToggled, toggle, value: toggled } = useBoolean();
  const [ref, { height: headerHeight }] = useElementSize();

  return (
    <>
      <NextTopLoader />
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper} ref={ref}>
          <Header onClose={closeToggled} toggle={toggle} toggled={toggled} />
        </div>
        <Element name="top">
          <main>{children}</main>
        </Element>
        <Footer />
      </div>
      <ToastContainer position="bottom-left" />
      <ScrollToTop
        className={`${styles.scrollToTop} ${sairaStencilOne.className}`}
        component={<>TO TOP ▲</>}
        onClick={(): void => {
          scroller.scrollTo("top", {
            duration: 500,
            offset: headerHeight * -1,
            smooth: true,
          });
        }}
      />
      <DrawerMenu
        headerHeight={headerHeight}
        onClose={closeToggled}
        open={toggled}
      />
    </>
  );
}
