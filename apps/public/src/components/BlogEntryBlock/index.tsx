import dayjs from "dayjs";
import styles from "./style.module.scss";
import Article from "@/components/Article";

export type BlogEntryBlockProps = {
  createdAt: string;
  title: string;
};

export default function BlogEntryBlock({
  createdAt,
  title,
}: BlogEntryBlockProps): JSX.Element {
  return (
    <div className={`${styles.wrapper} pattern-horizontal-stripes-lg`}>
      <Article heading="BLOG">
        <div className={styles.articleInner}>
          <div>
            <h2 className={styles.h2}>{title}</h2>
            <div className={styles.dateBlock}>
              {dayjs(createdAt).format("YYYY.M.D")}
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={styles.contentBlock}>aaa</div>
        </div>
      </Article>
    </div>
  );
}
