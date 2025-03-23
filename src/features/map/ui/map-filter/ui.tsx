import { MapStoreType, useMapStore } from "@/entities/map/model";
import { EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE } from "@/shared/config/constants";
import {
  Button,
  Input,
  Select,
  SelectLabel,
  SelectOption,
  getSelectSingleValue,
} from "@reindevu/shared-ui";
import { FC, useState } from "react";

export const MapFilter: FC = () => {
  const { setFilter } = useMapStore();
  const [localFilter, setLocalFilter] = useState<MapStoreType["filter"]>({
    date: undefined,
    typeMnemocode: undefined,
  });

  const handleSubmit = () => {
    console.log(localFilter);
    setFilter(localFilter);
  };

  return (
    <div className="h-16 absolute gap-4 backdrop-blur-sm z-[9999] top-5 w-10/12 left-1/2 -translate-x-2/4 rounded-xl flex items-center px-4">
      <Input
        type="date"
        value={localFilter.date ?? ""}
        onChange={(e) =>
          setLocalFilter((prev) => ({ ...prev, date: e.target.value }))
        }
      />

      <Select
        className="w-full"
        value={getSelectSingleValue(
          localFilter.typeMnemocode ?? "",
          EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE
        )}
        hideSearch={true}
        onChange={(value) => {
          if (value && !Array.isArray(value)) {
            setLocalFilter((prev) => ({ ...prev, typeMnemocode: value.id }));
          }
        }}
      >
        {EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE.map((key) => (
          <SelectOption key={key.id} value={key}>
            <SelectLabel>{key.name}</SelectLabel>
          </SelectOption>
        ))}
      </Select>

      <Button className="bg-green-600" onClick={handleSubmit}>
        Найти
      </Button>
    </div>
  );
};
