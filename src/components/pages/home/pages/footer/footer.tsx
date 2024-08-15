import { Page } from "@/components/fullpage/";

export default function Footer() {
  return (
    <Page
      name="页脚"
      height="16rem"
      class="h-64 bg-primary-950 border-t-2 border-secondary text-white"
    >
      <div class="grid grid-flow-row grid-cols-3 gap-12 p-14">
        <div>
          <a href="https://beian.miit.gov.cn/" target="_blank">
            备案号：{import.meta.env.RECORD_NUMBER}
          </a>
        </div>

        <div></div>

        <div></div>
      </div>
    </Page>
  );
}
