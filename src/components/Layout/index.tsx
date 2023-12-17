"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import HamburgerMenu from "react-hamburger-menu";
import useMeasure from "react-use-measure";
import { useBoolean } from "usehooks-ts";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.scss";
import Drawer from "@/components/Drawer";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  const {
    setFalse: offIsOpen,
    toggle: toggleIsOpen,
    value: isOpen,
  } = useBoolean(false);
  const [headerRef, { height: headerHeight }] = useMeasure();
  const [footerRef, { height: footerHeight }] = useMeasure();
  const pathname = usePathname();

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.headerWrapper}
        style={
          pathname !== "/"
            ? {
                height: `calc(100% - ${headerHeight / 2}px)`,
                top: headerHeight / 2,
              }
            : undefined
        }
      >
        <div
          className={styles.headerWrapper2}
          ref={headerRef}
          style={{ marginTop: headerHeight / -2 }}
        >
          <Header />
        </div>
      </div>
      <main style={{ minHeight: `calc(100dvh - ${footerHeight}px)` }}>
        {children}
      </main>
      <div className={styles.footerWrapper} ref={footerRef}>
        <Footer />
      </div>
      <div className={styles.drawerWrapper}>
        <Drawer onClose={offIsOpen} open={isOpen} />
      </div>
      <div className={styles.hamburgerMenuWrapper}>
        <HamburgerMenu
          color={isOpen ? "#6777ff" : "#fff"}
          isOpen={isOpen}
          menuClicked={toggleIsOpen}
        />
      </div>
    </div>
  );
}
