// eslint-disable-next-line filenames/match-exported
import { IBM_Plex_Sans_JP as IBMPlexSansJP } from "next/font/google";
import "pattern.css";
import { ReactNode } from "react";
import "react-modern-drawer/dist/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ress";
import "swiper/css";
import "swiper/css/autoplay";
// eslint-disable-next-line postcss-modules/no-unused-class
import "./globals.scss";
import "./mq-settings.scss";

const iBMPlexSansJP = IBMPlexSansJP({ subsets: ["latin"], weight: "400" });

export const metadata = {
  description:
    "Vライバー配信アプリIRIAM（イリアム）の事務所「HIGApro（ヒガプロ）」の公式サイトです。",
  title: "HIGApro（ヒガプロ）公式サイト",
};

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ja">
      <body className={iBMPlexSansJP.className}>
        {children}
        <ToastContainer position="bottom-left" />
      </body>
    </html>
  );
}
