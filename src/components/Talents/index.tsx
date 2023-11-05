import { Archivo } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { useWindowSize } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import styles from "./style.module.scss";

const archivo = Archivo({ subsets: ["latin"] });

type Talent = {
  id: string;
  image: string;
  name: string;
};

export type TalentsProps = {
  talents: Talent[];
};

export default function Talents({ talents }: TalentsProps): JSX.Element {
  const { width } = useWindowSize();
  const slideTalents = useMemo(
    () => [
      {
        src: "/S__68698159.png",
      },
      {
        src: "/S__68698161.png",
      },
      {
        src: "/S__68698162.png",
      },
    ],
    []
  );
  const [swiperWidth, setSwiperWidth] = useState(0);
  const slidesPerView = useMemo(
    () => Math.ceil(swiperWidth / 200),
    [swiperWidth]
  );
  const talentImageWidth = useMemo(
    () => swiperWidth / slidesPerView,
    [slidesPerView, swiperWidth]
  );
  const handleResize = useCallback<
    NonNullable<SwiperProps["onInit"]> & NonNullable<SwiperProps["onResize"]>
  >(({ width }) => {
    setSwiperWidth(width);
  }, []);

  return (
    <div className={styles.articleInner}>
      <div className={styles.heading2Wrapper}>
        <h2
          className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
        >
          TALENT
        </h2>
      </div>
      <div className={styles.talentsWrapper}>
        {talents.map(({ id, image, name }) => (
          <div className={styles.talentWrapper} key={image}>
            <Link href={`/talents/${id}`}>
              <div className={styles.talentImageWrapper}>
                <Image
                  alt="HIGApro"
                  fill={true}
                  quality={100}
                  src={image}
                  style={{
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
              </div>
            </Link>
            <div className={styles.name}>
              <Link href={`/talents/${id}`}>{name}</Link>
            </div>
          </div>
        ))}
      </div>
      <div
        className={styles.swiperWrapper}
        style={{ height: talentImageWidth * 3 }}
      >
        <Swiper
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className={styles.swiper}
          key={width}
          loop={true}
          modules={[Autoplay]}
          onInit={handleResize}
          onResize={handleResize}
          slidesPerView={slidesPerView}
          spaceBetween={0}
          speed={2500}
        >
          {typeof slidesPerView === "number"
            ? Array(Math.ceil((slidesPerView * 2) / talents.length))
                .fill(undefined)
                .map(() =>
                  slideTalents.map(({ src }) => (
                    <SwiperSlide key={uuidv4()}>
                      <div
                        style={{
                          height: talentImageWidth * 3,
                          width: talentImageWidth,
                        }}
                      >
                        <Image
                          alt="HIGApro"
                          fill={true}
                          quality={100}
                          src={src}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </SwiperSlide>
                  ))
                )
            : null}
        </Swiper>
        <div className={styles.articleContent}>
          <div className={styles.articleText}>
            第1期生募集中です。
            <br />
            私たちと最高のライバー生活を！
          </div>
        </div>
      </div>
    </div>
  );
}
