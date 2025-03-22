import { FC, useEffect } from "react";
import { useMap } from "react-leaflet";

type Props = {
  onChangeBounds: (bound: Record<"sw" | "ne", [number, number]>) => void;
};

export const MapChangeBounds: FC<Props> = ({ onChangeBounds }) => {
  const map = useMap();

  useEffect(() => {
    const updateBounds = () => {
      const b = map.getBounds();

      onChangeBounds({
        sw: [b.getSouthWest().lng, b.getSouthWest().lat],
        ne: [b.getNorthEast().lng, b.getNorthEast().lat],
      });
    };

    updateBounds(); // показать при загрузке

    map.on("moveend", updateBounds); // обновлять при перемещении/зуме

    return () => {
      map.off("moveend", updateBounds);
    };
  }, [map]);

  return null;
};
