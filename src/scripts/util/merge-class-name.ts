export default function mergeClass(...classNames: (string | boolean | undefined | null)[]) {
  return classNames.filter((cn) => typeof cn === "string").join(" ");
}
