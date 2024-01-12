"use client";
import { ReactNode, useEffect } from "react";
import useMeasure from "react-use-measure";
import Header from "@/components/Header";
import useHeaderStore from "@/stores/useHeaderStore";

export type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  const [ref, { height: headerHeight }] = useMeasure();
  const setHeight = useHeaderStore(({ setHeight }) => setHeight);

  useEffect(() => {
    setHeight(headerHeight);
  }, [headerHeight, setHeight]);

  return (
    <>
      <div ref={ref}>
        <Header />
      </div>
      <main>{children}</main>
    </>
  );
}
