import mergeClass from "@/scripts/util/merge-class-name";
import range from "@/scripts/util/range";
import { debounce } from "lodash";
import {
  Accessor,
  children,
  createEffect,
  createMemo,
  createSignal,
  JSXElement,
  onMount,
} from "solid-js";
import { useEventListener } from "solidjs-use";

export type FullpageProps = {
  /**
   * @description 起始 Page
   */
  page?: number;
  children?: JSXElement | ((page: Accessor<number>) => JSXElement);
};

export type PageInfo = {
  name?: string;
  height: string;
};

export default function Fullpage(props: FullpageProps) {
  let transformRef!: HTMLDivElement;
  let containerRef!: HTMLDivElement;

  const [pages, setPages] = createSignal<PageInfo[]>([]);
  const [pageCount, setPageCount] = createSignal<number>(1);
  const [page, setPage] = createSignal<number>(range(props.page || 1, 1, pageCount()));
  const resolved = children(() =>
    props.children instanceof Function ? props.children(page) : props.children,
  );
  createEffect(() => {
    const children = resolved.toArray() as HTMLElement[];

    const pages = children.filter((child) => child?.dataset["fullpage"] === "page");
    setPageCount(pages.length);
    setPages(
      pages.map((child) => ({
        name: child.dataset["name"],
        height: child.dataset["height"] ?? "",
      })),
    );
  });

  const nextPage = () => setPage((prev) => range(prev + 1, 1, pageCount()));
  const lastPage = () => setPage((prev) => range(prev - 1, 1, pageCount()));

  const translateY = createMemo(
    () =>
      pages()
        .slice(1, page())
        .map((p) => p.height)
        .join(" - ") || "0px",
  );

  onMount(() => {
    // 滑动处理
    let dragging = false;
    let pointerStartPositionY = 0;

    useEventListener(
      containerRef,
      "pointerdown",
      (ev: PointerEvent) => {
        if (ev.pointerType !== "mouse") {
          dragging = true;
          pointerStartPositionY = ev.screenY;
        }
      },
      { passive: true },
    );

    useEventListener(
      containerRef,
      "pointermove",
      (ev: PointerEvent) => {
        if (!dragging) return;
        const offset = ev.screenY - pointerStartPositionY;

        const scrollOffset = 6;
        if (offset <= -scrollOffset) {
          nextPage();
          dragging = false;
        } else if (offset >= scrollOffset) {
          lastPage();
          dragging = false;
        }
      },
      { passive: true },
    );

    useEventListener(
      containerRef,
      "pointerup",
      (ev: PointerEvent) => {
        if (ev.pointerType !== "mouse") dragging = false;
      },
      { passive: true },
    );

    // 滚动处理
    useEventListener(
      containerRef,
      "wheel",
      debounce((ev: WheelEvent) => (ev.deltaY > 0 ? nextPage() : lastPage()), 500, {
        maxWait: 1000,
        leading: true,
        trailing: false,
      }),
      { passive: true },
    );
  });

  return (
    <div ref={containerRef} class="w-dvw h-dvh overflow-hidden">
      <div
        ref={transformRef}
        class="h-auto transition-transform duration-500 ease-in-out"
        style={{ transform: `translateY(calc(0px - ${translateY()}))` }}
      >
        {resolved()}
      </div>
    </div>
  );
}

export type PageProps = {
  height?: string;
  class?: string;
  name?: string;
  children?: JSXElement;
};

export function Page(props: PageProps) {
  const height = () => props.height || "100dvh";
  return (
    <div
      data-name={props.name}
      data-fullpage="page"
      data-height={height()}
      class={mergeClass("relative w-auto h-auto", props.class)}
      style={{ height: height() }}
    >
      {props.children}
    </div>
  );
}
