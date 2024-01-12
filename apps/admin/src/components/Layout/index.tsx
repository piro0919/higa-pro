"use client";
import { StytchProvider } from "@stytch/nextjs";
import NextTopLoader from "nextjs-toploader";
import { ReactNode } from "react";
import styles from "./style.module.scss";
import stytch from "@/lib/stytch";

export type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <StytchProvider stytch={stytch}>
      <h1 className={styles.h1}>
        Higa Production（ヒガプロダクション）管理サービス
      </h1>
      {children}
      <NextTopLoader />
    </StytchProvider>
  );
}
