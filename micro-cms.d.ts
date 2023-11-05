declare namespace MicroCMS {
  type Image = {
    height: number;
    url: string;
    width: number;
  };

  type Talent = {
    images: Image[];
    name: string;
  };
}
