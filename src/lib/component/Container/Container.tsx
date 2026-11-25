import type { ReactNode } from "react";
// import "./style.css";

type Type = "clickable" | "popup" | "main" | "box";

type Background =
  | "page"
  | "primary"
  | "secondary"
  | "tertiary"
  | "surface-default"
  | "surface-raised"
  | "surface-sunken"
  | "surface-overlay";

type ContainerProps = {
  children: ReactNode;
  // Appearance
  background?: Background;
  type?: Type;
};

export default function Container({
  children,
  type,
  background,
}: ContainerProps) {
  const className =
    "container-" +
    type?.toString() +
    " " +
    "container-bg-" +
    background?.toString();

  return <div className={className}>{children}</div>;
}
