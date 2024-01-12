"use client";
import { useStytch, useStytchUser } from "@stytch/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Login from "@/components/Login";

export default function Page(): JSX.Element {
  const { isInitialized, user } = useStytchUser();
  const stytch = useStytch();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const callback = async (): Promise<void> => {
      if (!isInitialized || user) {
        return;
      }

      const token = searchParams.get("token");

      if (!token) {
        return;
      }

      const stytchTokenType = searchParams.get("stytch_token_type");

      switch (stytchTokenType) {
        case "oauth": {
          await stytch.oauth.authenticate(token, {
            session_duration_minutes: 60 * 24 * 30,
          });

          break;
        }
        case "magic_links": {
          await stytch.magicLinks.authenticate(token, {
            session_duration_minutes: 60 * 24 * 30,
          });

          break;
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    callback();
  }, [isInitialized, router, searchParams, stytch, user]);

  useEffect(() => {
    if (!isInitialized || !user) {
      return;
    }

    router.replace("/");
  }, [user, isInitialized, router]);

  return <Login />;
}
