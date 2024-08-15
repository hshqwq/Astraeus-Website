import publicUse from "@/scripts/util/public-use";
import { createResource } from "solid-js";

export type NewsType = "activity" | "announcement" | "news";

export interface News {
  id: `${number}`;
  type: NewsType;
  date: string; // todo use global time
  title: string;
  content: string;
  link?: string;
}

const fetcher = async () => {
  const json = await fetch(publicUse("/news/list.json")).then(
    (res) => res.json() as unknown as UnSafe<News[]>,
  );

  function check(news: UnSafe<News[]>): News[] {
    const error = new Error("Mistaken news list.");
    if (!(news instanceof Array)) throw error;

    return news.filter((news) => {
      if (typeof news !== "object") {
        console.warn("Mistaken news info.", news);
        return false;
      }

      for (const key of ["id", "type", "date", "title", "content"])
        if (
          !(key in news) ||
          typeof (news as unknown as Record<string, unknown>)[key] !== "string"
        ) {
          console.warn("Mistaken news info.", news);
          return false;
        }
    }) as News[];
  }

  return check(json);
};

export const [news, { refetch: refetchNews }] = createResource<News[]>(fetcher, {
  initialValue: [],
});
