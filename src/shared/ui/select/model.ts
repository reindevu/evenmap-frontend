import { SelectValue } from "@/shared/ui/select/ui";

type ListItem<T> = SelectValue & T;

export const getSelectSingleValue = <T>(
  value: string,
  list: ListItem<T>[] | SelectValue[]
): ListItem<T> | null => {
  const findEl = list.find((el) => el.id === value);

  if (!findEl) {
    return null;
  }

  return findEl as ListItem<T>;
};

export const getSelectMultipleValue = <T>(
  listValues: string[],
  list: SelectValue[]
): Array<SelectValue> => {
  const arr: Array<ListItem<T> | SelectValue> = [];

  listValues.forEach((value) => {
    const findEl = list.find((el) => el.id === value);

    if (findEl) {
      arr.push(findEl);
    }
  });

  return arr;
};
