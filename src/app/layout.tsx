// eslint-disable-next-line filenames/match-exported
import "pattern.css";
import { ReactNode } from "react";
import "react-modern-drawer/dist/index.css";
import "ress";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// eslint-disable-next-line postcss-modules/no-unused-class
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";

export const metadata = {
  description:
    "Vライバー配信アプリIRIAM（イリアム）の事務所「H Production（ヒガプロダクション）」の公式サイトです。",
  title: "Higa Production（ヒガプロダクション）公式サイト",
};

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ja">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
