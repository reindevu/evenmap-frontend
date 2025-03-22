"use client";

import * as Headless from "@headlessui/react";
import { cn } from "@/shared/lib";
import React, {
  FC,
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "..";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

export type Props = {
  className?: string;
  placeholder?: React.ReactNode;
  hideSearch?: boolean;
  virtualized?: boolean;
  children: React.ReactElement | Array<React.ReactElement>;
} & Headless.ListboxProps<typeof Fragment, SelectValue[] | SelectValue | null>;

export type SelectValue = {
  id: string;
  name: string;
};

const Select: FC<Props> = forwardRef(
  (
    { value, defaultValue, children: options, ...props },
    ref: React.ForwardedRef<HTMLSpanElement>
  ) => {
    const [query, setQuery] = useState("");

    const [selectedValues, setSelectedValues] = useState<SelectValue[]>(() => {
      const initial = value ?? defaultValue ?? [];
      return Array.isArray(initial) ? initial : [initial];
    });

    const [itemsToRender, setItemsToRender] = useState<React.ReactElement[]>(
      () =>
        props.virtualized ? [] : Array.isArray(options) ? options : [options]
    );

    const handleChange = (value: SelectValue | SelectValue[]) => {
      const newSelected = Array.isArray(value)
        ? value.filter((item) => item.id)
        : value.id
        ? [value]
        : [];

      setQuery("");
      setSelectedValues(newSelected);
      props.onChange?.(value);
    };

    useEffect(() => {
      if (props.virtualized) {
        return;
      }

      const q = query.toLowerCase();
      setItemsToRender(
        Children.toArray(options)
          .filter(isValidElement)
          .filter((el) =>
            ((el.props as SelectOptionProps).value as SelectValue).name
              .toLowerCase()
              .includes(q)
          )
      );
    }, [options, query]);

    useEffect(() => {
      setSelectedValues(value ? (Array.isArray(value) ? value : [value]) : []);
    }, [value]);

    return (
      <SelectList
        {...ref}
        {...props}
        selectedValues={selectedValues}
        itemsToRender={itemsToRender}
        children={options}
        onChange={handleChange}
        onQueryChange={setQuery}
      />
    );
  }
);

export type SelectOptionProps = {
  children: React.ReactNode;
  className?: string;
} & Headless.ListboxOptionProps<"div", unknown>;

const SelectOption: FC<SelectOptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Headless.ListboxOption as={Fragment} {...props}>
      {({ selectedOption }) => {
        if (selectedOption) {
          return (
            <div className={cn(className, "flex min-w-0 items-center")}>
              {children}
            </div>
          );
        }

        return (
          <div className="group/option data-[focus]:bg-neutral-100 data-[disabled]:opacity-50 flex justify-between p-1.5 rounded-md cursor-pointer data-[selected]:bg-neutral-100">
            <span className={cn(className, "flex min-w-0 items-center")}>
              {children}
            </span>

            <CheckIcon className="w-4 h-4 text-black relative hidden stroke-current group-data-[selected]/option:inline" />
          </div>
        );
      }}
    </Headless.ListboxOption>
  );
};

// -----

type SelectLabelProps = React.ComponentPropsWithoutRef<"span">;

const SelectLabel: FC<SelectLabelProps> = ({ className, ...props }) => (
  <span
    className={cn(
      className,
      "truncate first:ml-0 sm:ml-2 sm:first:ml-0 text-sm"
    )}
    {...props}
  />
);

// -----

type SelectListProps = Props & {
  selectedValues: SelectValue[];
  itemsToRender: React.ReactElement[];
  onQueryChange: (str: string) => void;
};

export const SelectList: FC<SelectListProps> = forwardRef(
  (
    {
      children,
      className,
      itemsToRender,
      hideSearch = false,
      multiple,
      placeholder,
      selectedValues,
      virtualized,
      onChange,
      onQueryChange,
      ...props
    },
    _
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null);

    const isShowInput = !hideSearch && !virtualized;

    return (
      <Headless.Listbox
        {...props}
        as="div"
        className="w-full"
        ref={rootRef}
        value={multiple ? selectedValues : selectedValues[0] ?? ""}
        multiple={multiple}
        onChange={onChange}
      >
        <Headless.ListboxButton
          className={cn(
            "relative flex items-center w-full border border-neutral-300 border-solid bg-white rounded-md h-8 shadow-sm appearance-none",
            className
          )}
        >
          {selectedValues.length > 0 && selectedValues[0].id ? (
            <span className="relative block w-full appearance-none truncate rounded-md py-[calc(theme(spacing[1.5]))] text-black text-left text-sm px-2 bg-transparent">
              {selectedValues[0].name}
            </span>
          ) : (
            <p className="relative block w-full appearance-none truncate rounded-md px-2 text-left text-sm text-neutral-500">
              {placeholder ?? "123"}
            </p>
          )}

          {selectedValues.length > 1 && (
            <div className="absolute inset-y-0 right-6 my-auto h-fit bg-violet-500 text-[0.625rem] text-white py-px px-1.5 rounded-md">
              + {selectedValues.length - 1}
            </div>
          )}

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="size-5 stroke-zinc-500 group-data-[disabled]:stroke-zinc-600 sm:size-4" />
          </span>
        </Headless.ListboxButton>

        <Headless.ListboxOptions
          as="div"
          transition
          anchor="bottom start"
          style={{ width: rootRef.current?.clientWidth }}
          className="mt-1 h-[230px] z-[9999] overflow-hidden rounded-md w-full overflow-y-scroll overscroll-contain bg-white backdrop-blur-xl shadow-lg ring-1 ring-zinc-950/10 transition-opacity duration-200 ease-in data-[transition]:pointer-events-none data-[closed]:data-[leave]:opacity-0"
        >
          {isShowInput && (
            <Input
              className="rounded-none rounded-t-lg border-l-0 border-r-0 border-t-0 shadow-none outline-0 ring-0 focus:border-primary-300 focus:outline-none focus:ring-0"
              onChange={(e) => onQueryChange(e.target.value)}
            />
          )}

          {virtualized && children}

          {!virtualized && (
            <div className="p-1">
              {itemsToRender.length > 0 ? (
                itemsToRender
              ) : (
                <p className="flex h-9 items-center justify-center text-sm">
                  Ничего не найдено
                </p>
              )}
            </div>
          )}
        </Headless.ListboxOptions>
      </Headless.Listbox>
    );
  }
);

export { Select, SelectLabel, SelectOption };
