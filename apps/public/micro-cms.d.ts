declare namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Talent = {
    debut: string;
    furigana: string;
    images?: Image[];
    iriamUrl: string;
    name: string;
    profile: string;
    rank?: 1 | 2 | 3 | 4 | 5;
    twitterUrl: string;
  };

  type News = {
    content: string;
    title: string;
  };
}
