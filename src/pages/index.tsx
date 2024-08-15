import styles from "@/styles/index.module.scss";

import Fullpage, { Page } from "@/components/fullpage";
import Footer from "@/components/pages/home/pages/footer/footer";
import MainPage from "@/components/pages/home/pages/main/main";
import publicUse from "@/scripts/util/public-use";
import AlbumPage from "@/components/pages/home/pages/album/album";

const bgDecorationPath = publicUse("/images/bg-decoration.png");
export default function Home() {
  let mainRef!: HTMLElement;

  return (
    <main
      ref={mainRef}
      class={`${styles.shadow} w-full h-full select-none bg-repeat-y bg-cover bg-primary-800 shadow-primary-950`}
      style={{ "background-image": `url(${bgDecorationPath})` }}
    >
      <Fullpage>
        <MainPage />
        <Page>
          <div class="w-dvh h-dvh bg-red-700"></div>
        </Page>
        <AlbumPage />
        <Footer />
      </Fullpage>
    </main>
  );
}
