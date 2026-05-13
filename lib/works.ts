import { client } from "./client";
import type { Work } from "../app/types/works";

export const getWorks = async () => {
  return client.getList<Work>({
    endpoint: "works",
  });
};

export const getWork = async (slug: string) => {
  const data = await client.getList<Work>({
    endpoint: "works",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });

  return data.contents[0];
};
