"use client";
import parse from "html-react-parser";
import Image from "next/image";
import Talents, { TalentsProps } from "../Talents";
import styles from "./style.module.scss";

export type TalentProps = Pick<TalentsProps, "talents"> & {
  image: {
    height: number;
    url: string;
    width: number;
  };
  iriamUrl: string;
  name: string;
  profile: string;
  twitterUrl: string;
};

export default function Talent({
  image: { height, url, width },
  iriamUrl,
  name,
  profile,
  talents,
  twitterUrl,
}: TalentProps): JSX.Element {
  return (
    <div className={`${styles.wrapper} pattern-zigzag-md`}>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <Image alt={name} height={height} src={url} width={width} />
        </div>
        <div>
          <div className={styles.nameWrapper}>
            <h2 className={styles.name}>{name}</h2>
          </div>
          <div className={styles.description}>{parse(profile)}</div>
          <div className={styles.buttonWrapper}>
            <button
              className={styles.iriamButton}
              onClick={(): void => {
                open(iriamUrl);
              }}
            >
              IRIAM
            </button>
            <button
              className={styles.twitterButton}
              onClick={(): void => {
                open(twitterUrl);
              }}
            >
              X（旧Twitter）
            </button>
          </div>
        </div>
      </div>
      <Talents talents={talents} />
    </div>
  );
}
