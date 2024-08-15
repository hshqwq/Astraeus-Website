import { Page } from "@/components/fullpage/";
import publicUse from "../../../../../scripts/util/public-use";
import LongPlay from "./long-play/long-play";
export default function AlbumPage() {
  return (
    <Page
      name="专辑"
      class="w-full h-screen relative pt-6 pl-4 flex flex-col justify-between max-w-sm"
    >
      {/* 上方的元素容器 */}
      <img
        class="w-fit max-lg:h-20 max-md:h-16 max-sm:h-14 object-cover object-left-top"
        src={publicUse("/images/logo.png")}
        alt="LOGO"
        width={512}
        height={512}
      />

      {/* 立绘 */}
      <div class="absolute left-0 bottom-0 h-5/6"></div>

      <div class="absolute top-2/3 left-3/4 text-[35vh] -translate-y-1/4 text-primary-700 opacity-75 -z-10 font-black skew-y-6">
        ASTRAEUS
      </div>

      {/* 下方容器 */}
      <div class="mb-4 flex">
        <LongPlay
          link="https://space.bilibili.com/630837548"
          coverUrl="/images/album/cover/agnostic.png"
          animate={false}
        ></LongPlay>
      </div>
    </Page>
  );
}
