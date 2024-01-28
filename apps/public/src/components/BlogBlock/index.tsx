import dayjs from "dayjs";
import Link from "next/link";
import { Fragment } from "react";
import styles from "./style.module.scss";
import Article from "@/components/Article";

type Blog = {
  createdAt: string;
  id: string;
  title: string;
};

export type BlogBlockProps = {
  blogList: Blog[];
  talentId: string;
};

export default function BlogBlock({
  blogList,
  talentId,
}: BlogBlockProps): JSX.Element {
  return (
    <div className={`${styles.wrapper} pattern-horizontal-stripes-lg`}>
      <Article heading="BLOG">
        <div className={styles.articleInner}>
          <div className={styles.blogWrapper}>
            {blogList.map(({ createdAt, id, title }, index) => (
              <Fragment key={id}>
                {index > 0 ? <hr className={styles.hr} /> : null}
                <Link
                  className={styles.blog}
                  href={`/talents/${talentId}/blog/${id}#blog`}
                >
                  <div className={styles.dateBlock}>
                    {dayjs(createdAt).format("YYYY.M.D")}
                  </div>
                  <div>{title}</div>
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
      </Article>
    </div>
  );
}
