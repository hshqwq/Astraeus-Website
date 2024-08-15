import { Show } from "solid-js";
export default function ResouseError(props: {
  message?: string;
  class?: string;
  refetch?: Function;
}) {
  return (
    <div class={props.class}>
      <span>{props.message || "错误"}</span>
      <Show when={props.refetch}>
        <button>重试</button>
      </Show>
    </div>
  );
}
