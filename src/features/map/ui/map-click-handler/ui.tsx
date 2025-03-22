import { FC } from "react";
import { useMapEvents } from "react-leaflet";

type Props = {
  onClick: (latLng: L.LatLng) => void;
};

export const MapClickHandler: FC<Props> = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e.latlng);
    },
  });

  return null;
};
