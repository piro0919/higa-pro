"use client";
import { ErrorMessage } from "@hookform/error-message";
import {
  Archivo,
  Saira_Stencil_One as SairaStencilOne,
} from "next/font/google";
import Image from "next/image";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Element } from "react-scroll";
import ScrollToTop from "react-scroll-to-top";
import TextareaAutosize from "react-textarea-autosize";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { useBoolean, useElementSize, useWindowSize } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import styles from "./style.module.scss";
import DrawerMenu from "@/components/DrawerMenu";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const archivo = Archivo({ subsets: ["latin"] });
const sairaStencilOne = SairaStencilOne({ subsets: ["latin"], weight: "400" });

type FieldValues = {
  content: string;
  email: string;
  name: string;
};

export type TopProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

export default function Top({ onSubmit }: TopProps): JSX.Element {
  const { height, width } = useWindowSize();
  const { setFalse: closeToggled, toggle, value: toggled } = useBoolean();
  const [ref, { height: headerHeight }] = useElementSize();
  const talents = useMemo(
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
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FieldValues>({
    defaultValues: {
      content: "",
      email: "",
      name: "",
    },
  });

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper} ref={ref}>
          <Header onClose={closeToggled} toggle={toggle} toggled={toggled} />
        </div>
        <main>
          <Element
            className={styles.top}
            name="top"
            style={{ height: `${height * 0.9}px` }}
          >
            <h1 className={styles.heading1}>HIGApro</h1>
            <div className={styles.logoWrapper}>
              <Image
                alt="HIGApro"
                className={styles.logo}
                fill={true}
                quality={100}
                src="logo.png"
              />
            </div>
          </Element>
          <Element className={styles.element} name="about">
            <article className={`${styles.article} pattern-dots-xl`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    ABOUT
                  </h2>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.articleText}>
                    HIGApro（ヒガプロ）は、Vライバー配信アプリIRIAM（イリアム）のVライバー事務所です。
                  </div>
                </div>
              </div>
            </article>
          </Element>
          <Element className={styles.element} name="talent">
            <article className={`${styles.article} pattern-zigzag-md`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    TALENT
                  </h2>
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
                            talents.map(({ src }) => (
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
            </article>
          </Element>
          <Element className={styles.element} name="contact">
            <article className={`${styles.article} pattern-triangles-md`}>
              <div className={styles.articleInner}>
                <div className={styles.heading2Wrapper}>
                  <h2
                    className={`${styles.heading2} ${archivo.className} pattern-vertical-lines-sm text-pattern`}
                  >
                    CONTACT
                  </h2>
                </div>
                <div className={styles.articleContent}>
                  <div className={styles.formWrapper}>
                    <form
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className={styles.filedsWrapper}>
                        <label className={styles.label}>
                          <span>お名前</span>
                          <input
                            {...register("name", {
                              required: "お名前を入力してください。",
                            })}
                            className={styles.input}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="name"
                            render={({ message }): ReactNode => (
                              <p className={styles.errorMessage}>{message}</p>
                            )}
                          />
                        </label>
                        <label className={styles.label}>
                          <span>メールアドレス</span>
                          <input
                            {...register("email", {
                              pattern: {
                                message:
                                  "正しいメールアドレス形式で入力してください。",
                                value:
                                  /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                              },
                              required: "メールアドレスを入力してください。",
                            })}
                            className={styles.input}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }): ReactNode => (
                              <p className={styles.errorMessage}>{message}</p>
                            )}
                          />
                        </label>
                        <label className={styles.label}>
                          <span>ご相談内容</span>
                          <TextareaAutosize
                            {...register("content", {
                              required: "ご相談内容を入力してください。",
                            })}
                            className={styles.textarea}
                            minRows={6}
                          />
                          <ErrorMessage
                            errors={errors}
                            name="content"
                            render={({ message }): ReactNode => (
                              <p className={styles.errorMessage}>{message}</p>
                            )}
                          />
                        </label>
                      </div>
                      <div className={styles.buttonWrapper}>
                        <button
                          className={styles.button}
                          disabled={isSubmitting}
                        >
                          送信する
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </article>
          </Element>
        </main>
        <Footer />
      </div>
      <ScrollToTop
        className={`${styles.scrollToTop} ${sairaStencilOne.className}`}
        component={<>TO TOP ▲</>}
        smooth={true}
      />
      <DrawerMenu
        headerHeight={headerHeight}
        onClose={closeToggled}
        open={toggled}
      />
    </>
  );
}
