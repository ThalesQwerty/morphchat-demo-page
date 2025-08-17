import { IconProps as PhosphorIconProps } from "@phosphor-icons/react";
import * as PhosphorIcons from "@phosphor-icons/react";

export type IconName = keyof typeof PhosphorIcons;

export interface IconProps extends Omit<PhosphorIconProps, "weight"> {
    name: IconName;
    weight?: PhosphorIconProps["weight"];
}

export function Icon({ name, weight = "regular", ...props }: IconProps) {
    const IconComponent = PhosphorIcons[
        name
    ] as React.ComponentType<PhosphorIconProps>;

    if (!IconComponent) {
        console.error(`Icon "${name}" not found in phosphor-icons`);
        return null;
    }

    return <IconComponent weight={weight} {...props} />;
}