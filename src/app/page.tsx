import { MicroCMSListResponse } from "microcms-js-sdk";
import Client, { ClientProps } from "./client";
import client from "@/libs/client";

type GetTalentsData = MicroCMSListResponse<MicroCMS.Talent>;

async function getTalents(): Promise<GetTalentsData> {
  const response = await client.getList<MicroCMS.Talent>({
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
    endpoint: "talents",
    queries: {
      limit: 100,
    },
  });

  return response;
}

export default async function Page(): Promise<JSX.Element> {
  const { contents } = await getTalents();
  const talents: ClientProps["talents"] = contents.map(
    ({ id, images: [{ url }], name }) => ({
      id,
      image: url,
      name,
    })
  );

  return <Client talents={talents} />;
}
