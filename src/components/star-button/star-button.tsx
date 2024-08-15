import Star from "../star/star";
import mergeClass from "../../../src/scripts/util/merge-class-name";
import { JSX, JSXElement, Show } from "solid-js";

export type IStarButtonProps = {
  icon?: JSXElement;
  size?: string;
  children?: JSXElement;
  class?: string;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export default function StarButton(props: IStarButtonProps) {
  return (
    <button
      {...props}
      class={`flex justify-evenly items-center relative ml-4 text-box ${props.class}`}
    >
      <Show when={props.icon}>
        <Star
          class={"bg-secondary shadow-sm"}
          rootClass={mergeClass(
            "absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center",
            props.size,
          )}
        >
          {props.icon}
        </Star>
      </Show>
      <span class="ml-2">{props.children}</span>
    </button>
  );
}
