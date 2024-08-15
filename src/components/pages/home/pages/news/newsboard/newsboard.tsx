import { news, News, refetchNews } from "@/configs/news";
import Newsline from "../../../../../../../src-old/components/newsline/newsline";
import { Index } from "solid-js";
import ResouseError from "@/components/resouse-error";

export interface ISpriteInfo {
  /** 唯一值 */
  key: string;
  /** 显示名 */
  label: string;
  /** 情报数据传参 */
  NLnewsdata: object[];
}

export default function Newsboard() {
  return (
    <div class="h-full w-full flex-col divide-y divide-dashed">
      <Index each={news()} fallback={<ResouseError message="获取日志失败" refetch={refetchNews} />}>
        {(item) => <NewsItem {...item()} />}
      </Index>
    </div>
  );
}

export function NewsItem(props: News) {
  return <></>;
}
