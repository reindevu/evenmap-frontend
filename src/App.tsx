import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet.markercluster";

import { EventForm } from "./features/event-form";
import { jsonRpcApi } from "./shared/jsonrpc";
import { MapFilter } from "./features/map/ui/map-filter/ui";

import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { useMapStore } from "./entities/map/model";
import {
  MapChangeBounds,
  MapClickHandler,
  MapClusterLayer,
} from "./features/map";
import { Drawer } from "@reindevu/shared-ui";

type DrawerEventType = {
  isOpen: boolean;
  data: {
    latLng: [number, number];
  };
};
function App() {
  const [drawerEvent, setDrawerEvent] = useState<DrawerEventType>({
    isOpen: false,
    data: {
      latLng: [0, 0],
    },
  });

  const [viewBound, setViewBound] =
    useState<Record<"sw" | "ne", [number, number]>>();

  const { filter } = useMapStore();

  const { data: eventList = [] } = jsonRpcApi.useEventListDefaultQuery(
    {
      sw: viewBound?.sw ?? [],
      ne: viewBound?.ne ?? [],
      ...filter,
    },
    { skip: !viewBound, refetchOnMountOrArgChange: true }
  );

  const handleMapClick = (latlng: L.LatLng) => {
    const latLng: [number, number] = [latlng.lat, latlng.lng];
    setDrawerEvent({ isOpen: true, data: { latLng: latLng } });
  };

  return (
    <div className="w-full h-full">
      <MapFilter />

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "100dvh", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapClickHandler onClick={handleMapClick} />

        <MapChangeBounds onChangeBounds={setViewBound} />

        <MapClusterLayer eventList={eventList} />
      </MapContainer>

      <Drawer
        open={drawerEvent.isOpen}
        header="Создания мероприятия"
        onOpenChange={() => {}}
      >
        <EventForm latLng={drawerEvent.data.latLng} />
      </Drawer>
    </div>
  );
}

export default App;
