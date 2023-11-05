"use client";
import Image from "next/image";
import Talents, { TalentsProps } from "../Talents";
import styles from "./style.module.scss";

export type TalentProps = Pick<TalentsProps, "talents"> & {
  image: {
    height: number;
    url: string;
    width: number;
  };
  name: string;
};

export default function Talent({
  image: { height, url, width },
  name,
  talents,
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
          <p className={styles.description}>
            2017年9月7日より活動を開始、ホロライブプロダクション初のバーチャルアイドル。歌とホラーゲームが大好きで、活動当初からの夢は「横浜アリーナでライブをすること」。
            <br />
            2019年3月にビクターエンタテインメントからメジャーデビュー。一人前のアイドルを目指すために、女優としてTVドラマ『四月一日さん家の』に出演したり、ラジオ『そらあおと！』ではMCを務めるなど、
            <br />
            様々なジャンルでアクティブに活動中。2019年10月6日にはときのそら初の単独ライブ「Dream!」を開催、自身の夢に一歩近づいた。
          </p>
          <div className={styles.buttonWrapper}>
            <button className={styles.iriamButton}>IRIAM</button>
            <button className={styles.twitterButton}>X（旧Twitter）</button>
          </div>
        </div>
      </div>
      <Talents talents={talents} />
    </div>
  );
}
