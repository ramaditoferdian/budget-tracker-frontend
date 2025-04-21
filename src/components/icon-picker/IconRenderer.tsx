import { FC } from "react";
import { IconProps } from "phosphor-react";
import { getPhosphorIcon, PhosphorIconName } from "@/lib/getPhosphorIcon";

type IconRendererProps = {
  name: PhosphorIconName;
  size?: number;
  color?: string;
  weight?: IconProps["weight"];
};

const IconRenderer: FC<IconRendererProps> = ({
  name,
  size = 24,
  color = "currentColor",
  weight = "regular",
}) => {
  const Icon = getPhosphorIcon(name);
  return <Icon size={size} color={color} weight={weight} />;
};

export default IconRenderer;
