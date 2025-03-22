"use client";

import * as Headless from '@headlessui/react';

import { FC } from "react";

import { cn } from "@/shared/lib";

type Props = Headless.LabelProps;

export const Label: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Headless.Label className={cn("text-sm text-neutral-600", className)} {...props}>
      {children}
    </Headless.Label>
  );
};
