"use server";
import { cookies } from "next/headers";

// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/require-await
export async function deleteTalentId(): Promise<void> {
  const cookieStore = cookies();

  cookieStore.delete("talentId");
}
