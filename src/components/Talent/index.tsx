"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import capitalize from "capitalize";
import dayjs from "dayjs";
import parse from "html-react-parser";
import { Zen_Kaku_Gothic_New as ZenKakuGothicNew } from "next/font/google";
import Image from "next/image";
import useAsyncEffect from "use-async-effect";
import { useBoolean } from "usehooks-ts";
import styles from "./style.module.scss";

const zenKakuGothicNew = ZenKakuGothicNew({
  subsets: ["latin"],
  weight: "700",
});

export type TalentProps = {
  debut: string;
  furigana: string;
  image?: {
    height: number;
    url: string;
    width: number;
  };
  iriamUrl: string;
  name: string;
  profile: string;
  rank?: 1 | 2 | 3 | 4 | 5;
  twitterUrl: string;
};

export default function Talent({
  debut,
  furigana,
  image,
  // iriamUrl,
  name,
  profile,
}: // twitterUrl,
TalentProps): JSX.Element {
  const { setTrue: onInit, value: init } = useBoolean(false);

  useAsyncEffect(async () => {
    await initParticlesEngine(async (engine) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await loadSlim(engine);
    });

    onInit();
  });

  return (
    <div className={`${styles.wrapper} pattern-grid-md`}>
      {init ? (
        <Particles
          className={styles.particles}
          options={{
            detectRetina: true,
            fpsLimit: 60,
            fullScreen: false,
            interactivity: {
              events: {
                resize: { enable: true },
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#6777ff",
              },
              links: {
                color: "#6777ff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  height: 800,
                  width: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.25,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { max: 5, min: 1 },
              },
            },
          }}
        />
      ) : null}
      <div className={styles.talentWrapper}>
        <div className={styles.talentImageWrapper}>
          {image ? (
            <Image
              alt={name}
              className={styles.talentImage}
              fill={true}
              quality={100}
              src={image.url}
            />
          ) : null}
        </div>
        <div className={styles.nameWrapper}>
          <div className={styles.nameInner}>
            <div
              className={`${styles.nameBlock} ${zenKakuGothicNew.className}`}
            >
              {name}
            </div>
            <div className={styles.furiganaBlock}>
              {furigana
                .split("-")
                .map((v) => capitalize(v))
                .join(" ")}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.detailWrapper}>
        <div className={styles.detailInner}>
          <div className={styles.profileBlock}>{parse(profile)}</div>
          <div>
            <dl className={styles.detailList}>
              <dt className={styles.detailTerm}>デビュー</dt>
              <dd>{dayjs(debut).format("YYYY年M月D日")}</dd>
            </dl>
            <div className={styles.buttonsWrapper}>
              <button className={styles.button}>IRIAM</button>
              <button className={styles.button}>X（旧Twitter）</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
