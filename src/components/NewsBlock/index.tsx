import NoSSR from "@mpth/react-no-ssr";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { Fragment, useState } from "react";
import SweetAlert2, { SweetAlert2Props } from "react-sweetalert2";
import styles from "./style.module.scss";
import Article from "@/components/Article";

type News = {
  content: string;
  id: string;
  publishedAt: string;
  title: string;
};

export type NewsBlockProps = {
  newsList: News[];
};

export default function NewsBlock({ newsList }: NewsBlockProps): JSX.Element {
  const [swal, setSwal] = useState<Pick<SweetAlert2Props, "title" | "text">>();

  return (
    <>
      <div className={`${styles.wrapper} pattern-checks-lg`}>
        <Article heading="NEWS">
          <div className={styles.articleInner}>
            <div className={styles.newsWrapper}>
              {newsList.map(({ content, id, publishedAt, title }, index) => (
                <Fragment key={id}>
                  {index > 0 ? <hr className={styles.hr} /> : null}
                  <div
                    className={styles.news}
                    onClick={(): void => {
                      setSwal({
                        text: content,
                        title,
                      });
                    }}
                  >
                    <div className={styles.dateBlock}>
                      {dayjs(publishedAt).format("YYYY/MM/DD")}
                    </div>
                    <div>{title}</div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </Article>
      </div>
      <NoSSR>
        <SweetAlert2
          icon="info"
          onConfirm={(): void => {
            setSwal(undefined);
          }}
          show={!!swal}
          title={swal?.title}
        >
          <div>{swal?.text ? parse(swal.text) : null}</div>
        </SweetAlert2>
      </NoSSR>
    </>
  );
}
