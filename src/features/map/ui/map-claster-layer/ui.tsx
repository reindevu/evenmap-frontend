import { EventListDefaultResponse } from "@/shared/jsonrpc";
import { FC, useEffect, useRef } from "react";

import L from "leaflet";
import "leaflet.markercluster";
import { useMap } from "react-leaflet";

import { Field } from "@headlessui/react";
import { Label, getSelectSingleValue } from "@/shared/ui";
import {
  EVENT_TYPE_MNEMOCODE_CHILDREN_MATINEE,
  EVENT_TYPE_MNEMOCODE_FURNITURE,
  EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE,
} from "@/shared/config/constants";
import { DateTime } from "luxon";
import ReactDOM from "react-dom/client";

import furnitureDisplayImg from "@/shared/assets/furniture_display.svg";
import childrenMatineeImg from "@/shared/assets/children_matinee.svg";

type Props = {
  eventList: EventListDefaultResponse;
};

export const MapClusterLayer: React.FC<Props> = ({ eventList }) => {
  const map = useMap();
  const rootsRef = useRef<ReactDOM.Root[]>([]);

  useEffect(() => {
    if (!map) return;

    const clusterGroup = L.markerClusterGroup();

    eventList.forEach((item) => {
      const marker = L.marker([item.coordinates[1], item.coordinates[0]], {
        icon: getMarkerIcon(item.typeMnemocode),
      });

      const container = document.createElement("div");
      const root = ReactDOM.createRoot(container);
      root.render(<MapClusterLayerPopup data={item} />);
      rootsRef.current.push(root);

      marker.bindPopup(container);

      clusterGroup.addLayer(marker);
    });

    map.addLayer(clusterGroup);

    return () => {
      map.removeLayer(clusterGroup);
    };
  }, [map, eventList]);

  return null;
};

type MapClusterLayerPopupProps = {
  data: EventListDefaultResponse[number];
};

export const MapClusterLayerPopup: FC<MapClusterLayerPopupProps> = ({
  data: key,
}) => {
  return (
    <div className="flex flex-col gap-4 w-96">
      <div className="grid grid-cols-2">
        <Field className="!space-y-0">
          <Label className="text-xs">Наименование</Label>

          <p className="text-sm font-medium">{key.name}</p>
        </Field>

        <Field className="!space-y-0">
          <Label className="text-xs">Тип</Label>

          <p className="text-sm font-medium">
            {
              getSelectSingleValue(
                key.typeMnemocode,
                EVENT_TYPE_MNEMOCODE_LIST_KEY_VALUE
              )?.name
            }
          </p>
        </Field>
      </div>

      <div className="grid grid-cols-2">
        <Field className="!space-y-0">
          <Label className="text-xs">Дата начала</Label>

          <p className="text-sm font-medium">
            {DateTime.fromISO(key.dateFrom).toFormat("dd.MM.yyyy")}
          </p>
        </Field>

        <Field className="!space-y-0">
          <Label className="text-xs">Дата окончания</Label>

          <p className="text-sm font-medium">
            {DateTime.fromISO(key.dateTo).toFormat("dd.MM.yyyy")}
          </p>
        </Field>
      </div>

      <Field className="!space-y-0 mt-2">
        <Label className="text-xs">Описание</Label>

        <p className="text-sm font-medium">{key.description}</p>
      </Field>
    </div>
  );
};

const furnitureDisplayIcon = new L.Icon({
  iconUrl: furnitureDisplayImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const childrenMatineeIcon = new L.Icon({
  iconUrl: childrenMatineeImg,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const getMarkerIcon = (typeMnemocode: string) => {
  if (typeMnemocode === EVENT_TYPE_MNEMOCODE_FURNITURE) {
    return furnitureDisplayIcon;
  }

  if (typeMnemocode === EVENT_TYPE_MNEMOCODE_CHILDREN_MATINEE) {
    return childrenMatineeIcon;
  }

  return undefined;
};
