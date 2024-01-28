import AboutBlock from "@/components/AboutBlock";
import ContactBlock, { ContactBlockProps } from "@/components/ContactBlock";
import ManagerBlock, { ManagerBlockProps } from "@/components/ManagerBlock";
import NewsBlock, { NewsBlockProps } from "@/components/NewsBlock";
import TalentBlock, { TalentBlockProps } from "@/components/TalentBlock";
import Top, { TopProps } from "@/components/Top";

export type AppProps = Pick<ContactBlockProps, "onSubmit"> &
  Pick<ManagerBlockProps, "managers"> &
  Pick<NewsBlockProps, "newsList"> &
  Pick<TalentBlockProps, "talents"> & {
    topTalents: TopProps["talents"];
  };

export default function App({
  managers,
  newsList,
  onSubmit,
  talents,
  topTalents,
}: AppProps): JSX.Element {
  return (
    <>
      <div id="top">
        <Top talents={topTalents} />
      </div>
      <div id="about">
        <AboutBlock />
      </div>
      <div id="news">
        <NewsBlock newsList={newsList} />
      </div>
      <div id="talent">
        <TalentBlock pathname="/" talents={talents} />
      </div>
      <div id="manager">
        <ManagerBlock managers={managers} pathname="/" />
      </div>
      <div id="contact">
        <ContactBlock onSubmit={onSubmit} />
      </div>
    </>
  );
}
