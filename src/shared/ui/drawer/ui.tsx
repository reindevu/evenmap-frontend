import * as Headless from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, Fragment } from "react";

import { cn } from "@/shared/lib";
import { Button } from "../button";

type Props = {
  open: boolean;
  onOpenChange: () => void;
  header?: string;
  children: React.ReactNode;
  panelClassName?: string;
  childrenClassName?: string;
};

export const Drawer: FC<Props> = props => {
  return (
    <Headless.Transition show={props.open} as={Fragment}>
      <Headless.Dialog as="div" className="relative z-[999]" onClose={props.onOpenChange}>
        <Headless.TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity backdrop-blur-[2px]" />
        </Headless.TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex pl-10">
              <Headless.TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Headless.DialogPanel
                  className={clsx("pointer-events-auto relative w-screen lg:max-w-xl flex flex-col justify-center", props.panelClassName)}
                >
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-4 md:py-6 shadow-xl w-full">
                    {props.header && (
                      <div className="flex items-center justify-between px-4 sm:px-6">
                        <Headless.DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                          {props.header}
                        </Headless.DialogTitle>

                        <Button
                          variant="unstyled"
                          type="button"
                          className="relative rounded-md text-gray-300 focus:outline-none"
                          onClick={props.onOpenChange}
                        >
                          <XMarkIcon className="h-6 w-6 text-black" aria-hidden="true" />
                        </Button>
                      </div>
                    )}

                    <div
                      className={cn("relative flex-1 px-4 md:px-6", props.childrenClassName, {
                        "mt-6": !!props.header,
                      })}
                    >
                      {props.children}
                    </div>
                  </div>
                </Headless.DialogPanel>
              </Headless.TransitionChild>
            </div>
          </div>
        </div>
      </Headless.Dialog>
    </Headless.Transition>
  );
};
