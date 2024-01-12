import dayjs from "dayjs";
import Link from "next/link";
import { useParams } from "next/navigation";
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
};

export default function BlogBlock({ blogList }: BlogBlockProps): JSX.Element {
  const { talentName } = useParams();

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
                  href={`/talents/${
                    typeof talentName === "string" ? talentName : ""
                  }/blog/${id}#blog`}
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
