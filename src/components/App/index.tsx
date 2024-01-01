import AboutBlock from "@/components/AboutBlock";
import ContactBlock, { ContactBlockProps } from "@/components/ContactBlock";
import NewsBlock, { NewsBlockProps } from "@/components/NewsBlock";
import TalentBlock, { TalentBlockProps } from "@/components/TalentBlock";
import Top, { TopProps } from "@/components/Top";

export type AppProps = Pick<ContactBlockProps, "onSubmit"> &
  Pick<NewsBlockProps, "newsList"> &
  Pick<TalentBlockProps, "talents">;

export default function App({
  newsList,
  onSubmit,
  talents,
}: AppProps): JSX.Element {
  return (
    <>
      <div id="top">
        <Top
          talents={
            talents.filter(({ image }) => !!image) as TopProps["talents"]
          }
        />
      </div>
      <div id="about">
        <AboutBlock />
      </div>
      <div id="news">
        <NewsBlock newsList={newsList} />
      </div>
      <div id="talent">
        <TalentBlock talents={talents} />
      </div>
      <div id="contact">
        <ContactBlock onSubmit={onSubmit} />
      </div>
    </>
  );
}
