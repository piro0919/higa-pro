import {
  GetListDetailRequest,
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSListResponse,
} from "microcms-js-sdk";
import Talent, { TalentProps } from "@/components/Talent";
import client from "@/libs/client";

type StaticParam = {
  talentId: string;
};

type StaticParams = StaticParam[];

export async function generateStaticParams(): Promise<StaticParams> {
  const { contents } = await client.getList<MicroCMS.Talent>({
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
    endpoint: "talents",
  });

  return contents.map(({ id }) => ({
    talentId: id,
  }));
}

type GetTalentParams = Pick<GetListDetailRequest, "contentId">;

type GetTalentData = MicroCMS.Talent & MicroCMSContentId & MicroCMSDate;

async function getTalent({
  contentId,
}: GetTalentParams): Promise<GetTalentData> {
  const response = await client.getListDetail<MicroCMS.Talent>({
    contentId,
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
    endpoint: "talents",
  });

  return response;
}

type GetTalentsData = MicroCMSListResponse<MicroCMS.Talent>;

async function getTalents(): Promise<GetTalentsData> {
  const response = await client.getList<MicroCMS.Talent>({
    customRequestInit: {
      next: {
        revalidate: 60 * 60,
      },
    },
    endpoint: "talents",
  });

  return response;
}

type PageProps = {
  params: { talentId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({
  params: { talentId },
}: PageProps): Promise<JSX.Element> {
  const { images, name } = await getTalent({ contentId: talentId });
  const image: TalentProps["image"] = images[0];
  const { contents } = await getTalents();
  const talents: TalentProps["talents"] = contents
    .filter(({ id }) => talentId !== id)
    .map(({ id, images: [{ url }], name }) => ({
      id,
      image: url,
      name,
    }));

  return <Talent image={image} name={name} talents={talents} />;
}
