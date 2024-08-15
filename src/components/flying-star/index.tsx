import styles from "./flying-star.module.scss";

import { createSignal, For, JSX, JSXElement, onMount } from "solid-js";
import Star from "../star/star";
import { useIntervalFn } from "solidjs-use";
import random from "@/scripts/util/random";

export function FlyingStarContainer(props: { durtion: millisecond; interval: millisecond }) {
  const [stars, setStars] = createSignal<`${number}%`[]>([], { equals: false });

  useIntervalFn(() => {
    setStars((prev) => {
      prev.push(`${random(0, 100, false)}%`);
      return prev;
    });

    // setTimeout();
  }, props.interval);

  return (
    <div class="absolute left-0 right-0 bottom-0 w-full h-full">
      <For each={stars()}>
        {(position) => (
          <FlyingStar
            class={`absolute ${styles["flying-star"]}`}
            style={{ left: position, animation: `flying-star ${props.durtion}ms` }}
          />
        )}
      </For>
    </div>
  );
}

export function FlyingStar(props: { class: string; style?: JSX.CSSProperties }) {
  return (
    <div class={`flex flex-col ${props.class}`} style={props.style}>
      <Star class="w-4" />
    </div>
  );
}
