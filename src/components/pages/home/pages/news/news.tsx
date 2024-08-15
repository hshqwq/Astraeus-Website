import Newsboard from "./newsboard/newsboard";
import SlideBox from "../../../../../../src-old/components/slide-box/slide-box";
import { Page } from "@/components/fullpage";

export default function NewsPage() {
  return (
    <Page class="w-full h-screen pt-6 pl-4 flex flex-rol sm:justify-center max-md:justify-between">
      {/* 左侧的元素容器 */}
      <div class="h-screen max-w-sm  flex flex-col justify-evenly">
        {/* 轮播图容器，屏幕宽度达到指定大小隐藏 */}
        <div class="mb-4 mx-2 flex lg:invisible md:visible sm:visible">
          <SlideBox></SlideBox>
        </div>

        {/* 下方容器 */}
        <div class="mb-4 mx-2 flex">
          <Newsboard></Newsboard>
        </div>
      </div>

      <div class="h-screen flex flex-col justify-center max-lg:hidden mr-20">
        {/* 轮播图容器，屏幕宽度达到指定大小隐藏 */}
        <div class="mb-4 mx-10 mr-10 min-h-max flex">
          <SlideBox></SlideBox>
        </div>
      </div>
    </Page>
  );
}
