const siteName = "Higa Production 管理画面";
const description =
  "Vライバー配信アプリIRIAM（イリアム）の事務所「H Production（ヒガプロダクション）」の管理画面です。";
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
