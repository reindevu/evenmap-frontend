import { create } from "zustand";

export type MapStoreType = {
  filter: {
    typeMnemocode: string | undefined;
    date: string | undefined;
  };
  setFilter: (value: MapStoreType["filter"]) => void;
};

export const useMapStore = create<MapStoreType>()((set) => ({
  filter: {
    typeMnemocode: undefined,
    date: undefined,
  },
  setFilter: (value) =>
    set((state) => ({ filter: { ...state.filter, ...value } })),
}));
