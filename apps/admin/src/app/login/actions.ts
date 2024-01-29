"use server";
import { cookies } from "next/headers";

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function setTalentId(talentId: string): Promise<void> {
  const cookieStore = cookies();

  cookieStore.set("talentId", talentId);
}
