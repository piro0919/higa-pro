const siteName = "Higa Production（ヒガプロダクション）公式サイト";
const description =
  "Vライバー配信アプリIRIAM（イリアム）の事務所「H Production（ヒガプロダクション）」の公式サイトです。";
const defaultMetadata = {
  description,
  openGraph: {
    description,
    images: ["https://www.higapro.jp/opengraph-image.png"],
    locale: "ja_JP",
    siteName,
    title: siteName,
    type: "website",
    url: "/",
  },
  siteName,
  twitter: {
    description,
    site: "HIGA_pro_0608",
    title: siteName,
  },
};

export default defaultMetadata;
