"use client";
import {
  Archivo,
  Saira_Stencil_One as SairaStencilOne,
} from "next/font/google";
import Image from "next/image";
import { Element } from "react-scroll";
import ScrollToTop from "react-scroll-to-top";
import { useBoolean, useElementSize, useWindowSize } from "usehooks-ts";
import styles from "./style.module.scss";
import DrawerMenu from "@/components/DrawerMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const archivo = Archivo({ subsets: ["latin"] });
const sairaStencilOne = SairaStencilOne({ subsets: ["latin"], weight: "400" });

export default function Top(): JSX.Element {
  const { height } = useWindowSize();
  const { setFalse: closeToggled, toggle, value: toggled } = useBoolean();
  const [ref, { height: headerHeight }] = useElementSize();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper} ref={ref}>
          <Header onClose={closeToggled} toggle={toggle} toggled={toggled} />
        </div>
        <main>
          <Element
            className={styles.top}
            name="top"
            style={{ height: `${height * 0.9}px` }}
          >
            <h1 className={styles.heading1}>HIGApro</h1>
            <div className={styles.logoWrapper}>
              <Image
                alt="HIGApro"
                className={styles.logo}
                fill={true}
                quality={100}
                src="logo.png"
              />
            </div>
          </Element>
          <Element className={styles.element} name="about">
            <article className={`${styles.article} pattern-dots-xl`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    ABOUT
                  </h2>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleText}>
                    HIGApro（ヒガプロ）は、Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
                  </div>
                </div>
              </div>
            </article>
          </Element>
          <Element className={styles.element} name="talent">
            <article className={`${styles.article} pattern-zigzag-md`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    TALENT
                  </h2>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleText}>
                    第1期生募集中です。
                    <br />
                    私たちと最高のライバー生活を！
                  </div>
                </div>
              </div>
            </article>
          </Element>
          <Element className={styles.element} name="contact">
            <article className={`${styles.article} pattern-triangles-md`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    CONTACT
                  </h2>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleText}>準備中</div>
                </div>
              </div>
            </article>
          </Element>
        </main>
        <Footer />
      </div>
      <ScrollToTop
        className={`${styles.scrollToTop} ${sairaStencilOne.className}`}
        component={<>TO TOP ▲</>}
        smooth={true}
      />
      <DrawerMenu
        headerHeight={headerHeight}
        onClose={closeToggled}
        open={toggled}
      />
    </>
  );
}
