import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { Client, envs } from "stytch";
import { deleteTalentId } from "./actions";
import AuthLayout from "@/components/AuthLayout";

export type LayoutProps = {
  children: ReactNode;
};

export default async function Layout({
  children,
}: LayoutProps): Promise<JSX.Element> {
  const cookieStore = cookies();
  const sessionJWT = cookieStore.get("stytch_session_jwt");
  const talentId = cookieStore.get("talentId");

  if (!sessionJWT || typeof talentId?.value !== "string") {
    redirect("/login");
  }

  const stytchClient = new Client({
    env: process.env.STYTCH_PROJECT_ENV === "live" ? envs.live : envs.test,
    project_id: process.env.STYTCH_PROJECT_ID || "",
    secret: process.env.STYTCH_SECRET || "",
  });

  try {
    await stytchClient.sessions.authenticateJwt({
      session_jwt: sessionJWT.value,
    });
  } catch {
    redirect("/login");
  }

  return (
    <AuthLayout deleteTalentId={deleteTalentId} talentId={talentId.value}>
      {children}
    </AuthLayout>
  );
}
