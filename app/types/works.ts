export type Work = {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  detail: string;
  url: string;
  tags: string[];
};
