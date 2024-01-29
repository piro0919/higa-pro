// eslint-disable-next-line filenames/match-exported
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import "@uiw/react-markdown-preview/markdown.css";
import "@uiw/react-md-editor/markdown-editor.css";
import type { Metadata } from "next";
import { M_PLUS_1 as MPlus1 } from "next/font/google";
import "ress";
import "./globals.scss";
import "./mq-settings.scss";
import Layout from "@/components/Layout";
import defaultMetadata from "@/lib/defaultMetadata";

const mPlus1 = MPlus1({ subsets: ["latin"], weight: "400" });
const url = "https://admin.higapro.jp";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html data-color-mode="light" lang="ja">
      <body className={mPlus1.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
