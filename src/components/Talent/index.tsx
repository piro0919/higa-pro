"use client";
import { useParams } from "next/navigation";
import TalentBlock, { TalentBlockProps } from "@/components/TalentBlock";
import TalentTop, { TalentTopProps } from "@/components/TalentTop";

export type TalentProps = Pick<TalentBlockProps, "talents"> &
  Pick<
    TalentTopProps,
    "height" | "name" | "profile" | "url" | "width" | "iriamUrl" | "twitterUrl"
  >;

export default function Talent({
  height,
  iriamUrl,
  name,
  profile,
  talents,
  twitterUrl,
  url,
  width,
}: TalentProps): JSX.Element {
  const { talentName } = useParams();

  return (
    <>
      <TalentTop
        height={height}
        iriamUrl={iriamUrl}
        name={name}
        profile={profile}
        talents={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          talents
            .filter(({ furigana }) => talentName !== furigana)
            .filter(({ image }) => !!image) as TalentTopProps["talents"]
        }
        twitterUrl={twitterUrl}
        url={url}
        width={width}
      />
      <div id="talent">
        <TalentBlock talents={talents} />
      </div>
    </>
  );
}
