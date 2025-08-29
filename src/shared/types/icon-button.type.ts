import { IconButtonProps as IconButtonProperties } from "@chakra-ui/react";
import { IconName } from "./icon.type";

export interface IconButtonProps extends Omit<IconButtonProperties, "icon"> {
  icon: IconName;
}
