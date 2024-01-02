// eslint-disable-next-line filenames/match-exported
import { Metadata } from "next";
import { M_PLUS_1 as MPlus1 } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "pattern.css";
import { ReactNode } from "react";
import "react-modern-drawer/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import "ress";
// eslint-disable-next-line postcss-modules/no-unused-class
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";
import defaultMetadata from "@/lib/defaultMetadata";

const mPlus1 = MPlus1({ subsets: ["latin"], weight: "400" });
const url = "https://www.higapro.jp";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: defaultMetadata.description,
  metadataBase: new URL(url),
  openGraph: defaultMetadata.openGraph,
  title: {
    default: defaultMetadata.siteName,
    template: `%s | ${defaultMetadata.siteName}`,
  },
  twitter: defaultMetadata.twitter,
};

export type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ja">
      <body className={mPlus1.className}>
        <NextTopLoader />
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
