import { ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";
import styles from "./style.module.scss";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <div className={styles.headerWrapper}>
        <Header />
      </div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
