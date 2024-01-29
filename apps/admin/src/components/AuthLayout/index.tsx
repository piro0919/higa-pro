"use client";
import { useStytchUser } from "@stytch/nextjs";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import useMeasure from "react-use-measure";
import Header, { HeaderProps } from "@/components/Header";
import useHeaderStore from "@/stores/useHeaderStore";

export type AuthLayoutProps = Pick<HeaderProps, "deleteTalentId"> & {
  children: ReactNode;
  talentId: string;
};

export default function AuthLayout({
  children,
  deleteTalentId,
  talentId,
}: AuthLayoutProps): JSX.Element {
  const [ref, { height: headerHeight }] = useMeasure();
  const setHeight = useHeaderStore(({ setHeight }) => setHeight);
  const { isInitialized, user } = useStytchUser();
  const router = useRouter();

  useEffect(() => {
    setHeight(headerHeight);
  }, [headerHeight, setHeight]);

  useEffect(() => {
    if (!isInitialized || !user) {
      return;
    }

    const { trusted_metadata: trustedMetadata } = user;

    if (talentId === trustedMetadata.talentId) {
      return;
    }

    router.push("/login");
  }, [user, isInitialized, router, talentId]);

  return (
    <>
      <div ref={ref}>
        <Header deleteTalentId={deleteTalentId} />
      </div>
      <main>{children}</main>
    </>
  );
}
