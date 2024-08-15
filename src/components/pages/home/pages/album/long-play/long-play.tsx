import publicUse from "@/scripts/util/public-use";

export default function LongPlay(props: { link: string; coverUrl: string; animate: boolean }) {
  return (
    <button
      class="rounded-full w-full p-4 flex place-content-center bg-origin-border bg-center bg-cover"
      onClick={() => props.link && open(props.link, "_blank")}
      style={{ "background-image": `url(${publicUse("/images/album/long-play.png")})` }}
    >
      <div class="w-1/2 m-auto rounded-full bg-black place-content-center overflow-hidden">
        <img src={props.coverUrl} class="w-40 h-40" style={{ "object-fit": "cover" }} />
      </div>
    </button>
  );
}
