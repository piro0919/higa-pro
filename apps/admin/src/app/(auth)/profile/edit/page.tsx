import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import ProfileEdit from "@/components/ProfileEdit";
import microcmsClient from "@/lib/microcmsClient";

type GetTalentData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent(): Promise<GetTalentData> {
  const cookieStore = cookies();
  const talentId = cookieStore.get("talentId");

  if (typeof talentId?.value !== "string") {
    notFound();
  }

  const response = await microcmsClient.get<
    MicroCMS.Talent & MicroCMSContentId & MicroCMSDate
  >({
    contentId: talentId.value,
    customRequestInit: {
      next: {
        revalidate: false,
      },
    },
    endpoint: "talents",
    queries: { fields: "images,profile" },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { images, profile } = await getTalent();

  return <ProfileEdit profile={profile} />;
}
