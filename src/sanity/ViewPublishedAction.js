import { LaunchIcon } from "@sanity/icons";
export function ViewPublishedAction({ published, onComplete }) {
  const slug = published?.slug?.current;
  return {
    label: "View published article",
    icon: LaunchIcon,
    disabled: !slug,
    onHandle: () => {
      window.open(
        "/blogs/" + encodeURIComponent(slug),
        "_blank",
        "noopener,noreferrer",
      );
      onComplete();
    },
  };
}
