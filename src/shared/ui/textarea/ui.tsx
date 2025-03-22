"use client";

import * as Headless from "@headlessui/react";
import { FC, forwardRef } from "react";

import { cn } from "@/shared/lib";

type Props = Headless.TextareaProps & {
  rows?: number;
  readOnly?: boolean;
};

export const Textarea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  ({ className, rows, ...props }, ref) => {
    return (
      <Headless.Textarea
        ref={ref}
        className={cn(
          "w-full rounded-md bg-transparent p-2.5 placeholder:text-sm text-sm shadow-sm placeholder:text-neutral-500 focus:outline-none border border-neutral-300 border-solid",
          className
        )}
        rows={rows}
        {...props}
      />
    );
  }
);
