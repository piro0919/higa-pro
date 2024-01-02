import styles from "./style.module.scss";
import Article from "@/components/Article";

export default function AboutBlock(): JSX.Element {
  return (
    <div className={`${styles.wrapper} pattern-diagonal-stripes-lg`}>
      <Article heading="ABOUT">
        <div className={styles.articleInner}>
          <p className={styles.description}>
            Higa Production（ヒガプロダクション）は、
            <br />
            Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
          </p>
        </div>
      </Article>
    </div>
  );
}
