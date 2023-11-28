declare namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Talent = {
    furigana: string;
    images: Image[];
    name: string;
  };
}
