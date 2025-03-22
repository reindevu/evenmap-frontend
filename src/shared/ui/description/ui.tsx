"use client";

import * as Headless from '@headlessui/react';

import { FC } from "react";

import { cn } from "@/shared/lib";

type Props = Headless.DescriptionProps;

export const Description: FC<Props> = ({ children, className, ...props }) => {
  return (
    <Headless.Description className={cn("text-xs text-neutral-600", className)} {...props}>
      {children}
    </Headless.Description>
  );
};
