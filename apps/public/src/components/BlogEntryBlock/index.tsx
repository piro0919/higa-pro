import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, INLINES } from "@contentful/rich-text-types";
import styles from "./style.module.scss";
import Article from "@/components/Article";
import dayjs from "dayjs";

export type BlogEntryBlockProps = {
  content: Document;
  createdAt: string;
  title: string;
};

export default function BlogEntryBlock({
  content,
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
          <div className={styles.contentBlock}>
            {documentToReactComponents(content, {
              preserveWhitespace: true,
              renderNode: {
                [INLINES.HYPERLINK]: ({ data: { uri }, content }) => (
                  <a target="_blank" href={uri}>
                    {(content[0] as any).value}
                  </a>
                ),
              },
            })}
          </div>
        </div>
      </Article>
    </div>
  );
}
