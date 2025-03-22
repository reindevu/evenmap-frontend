import * as Headless from "@headlessui/react";
import { FC } from "react";

import { cn } from "@/shared/lib";

interface Props extends Headless.ButtonProps {
  variant?: "primary" | "secondary" | "tertinary" | "unstyled";
}

export const Button: FC<Props> = ({
  children,
  className = "",
  variant = "primary",
  ...props
}) => {
  return (
    <Headless.Button
      className={cn(
        "text-xs shadow-md",
        {
          "rounded-md gap-2 px-3 h-8 py-1.5 cursor-pointer border-none flex items-center justify-center text-xs disabled:opacity-50":
            variant !== "unstyled",
          "border-none bg-transparent cursor-pointer w-fit h-fit":
            variant === "unstyled",
          "bg-neutral-500 font-medium text-white border border-black/10 border-solid":
            variant === "primary",
          "border border-neutral-300 border-solid text-neutral-500":
            variant === "tertinary",
          "border border-neutral-300 border-solid": variant === "secondary",
        },
        className
      )}
      {...props}
    >
      {children}
    </Headless.Button>
  );
};
