import { FC, useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Polygon,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";

import { EventListDefaultResponse } from "@/shared/jsonrpc";
import { MapChangeBounds, MapClickHandler, MapClusterLayer } from "@/features/map";
import { SavedPlot } from "@/entities/plot/model/types";

type Props = {
  eventList: EventListDefaultResponse;
  savedPolygons: SavedPlot[];
  selectedPlotId: number | null;
  draftPolygonPoints: [number, number][];
  draftInnerPoints: [number, number][];
  isDraftPolygonClosed: boolean;
  onMapClick: (latlng: L.LatLng) => void;
  onChangeBounds: (bound: Record<"sw" | "ne", [number, number]>) => void;
  onMapReady: (map: L.Map) => void;
  onSavedPolygonClick: (polygon: SavedPlot, event: L.LeafletMouseEvent) => void;
  onSavedPolygonDoubleClick: (polygon: SavedPlot, event: L.LeafletMouseEvent) => void;
  onSavedPointClick: (
    plotId: number,
    pointId: number,
    point: [number, number],
    name: string,
    description: string,
    event: L.LeafletMouseEvent
  ) => void;
};

export const MapScene: FC<Props> = ({
  eventList,
  savedPolygons,
  selectedPlotId,
  draftPolygonPoints,
  draftInnerPoints,
  isDraftPolygonClosed,
  onMapClick,
  onChangeBounds,
  onMapReady,
  onSavedPolygonClick,
  onSavedPolygonDoubleClick,
  onSavedPointClick,
}) => {
  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      doubleClickZoom={false}
      style={{ height: "100dvh", width: "100%" }}
    >
      <MapInstanceObserver onReady={onMapReady} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <MapClickHandler onClick={onMapClick} />
      <MapChangeBounds onChangeBounds={onChangeBounds} />
      <MapClusterLayer eventList={eventList} />

      {savedPolygons.map((polygon) => (
        <Polygon
          key={`saved-plot-${polygon.id}`}
          positions={polygon.boundaryPoints}
          pathOptions={{
            color: polygon.id === selectedPlotId ? "#1d4ed8" : "#2563eb",
            fillColor: polygon.id === selectedPlotId ? "#60a5fa" : "#93c5fd",
            fillOpacity: polygon.id === selectedPlotId ? 0.5 : 0.35,
            weight: polygon.id === selectedPlotId ? 3 : 2,
          }}
          eventHandlers={{
            click: (event) => onSavedPolygonClick(polygon, event),
            dblclick: (event) => onSavedPolygonDoubleClick(polygon, event),
          }}
        >
          <Tooltip sticky>
            <div className="text-xs">
              <div className="font-semibold">{polygon.name}</div>
              <div>{polygon.description}</div>
            </div>
          </Tooltip>
        </Polygon>
      ))}

      {draftPolygonPoints.length > 0 && !isDraftPolygonClosed && (
        <Polyline positions={draftPolygonPoints} pathOptions={{ color: "#ef4444", weight: 3 }} />
      )}

      {isDraftPolygonClosed && draftPolygonPoints.length >= 3 && (
        <Polygon
          positions={draftPolygonPoints}
          pathOptions={{
            color: "#ef4444",
            fillColor: "#f87171",
            fillOpacity: 0.45,
            weight: 3,
          }}
        />
      )}

      {draftPolygonPoints.map((point, index) => (
        <CircleMarker
          key={`draft-point-${index}`}
          center={point}
          radius={index === 0 ? 7 : 5}
          pathOptions={{
            color: index === 0 ? "#16a34a" : "#ef4444",
            fillOpacity: 1,
          }}
        >
          {index === 0 && !isDraftPolygonClosed && (
            <Tooltip direction="top" permanent>
              Первая точка
            </Tooltip>
          )}
        </CircleMarker>
      ))}

      {draftInnerPoints.map((point, index) => (
        <CircleMarker
          key={`draft-inner-point-${index}`}
          center={point}
          radius={5}
          pathOptions={{
            color: "#1d4ed8",
            fillColor: "#60a5fa",
            fillOpacity: 1,
          }}
        />
      ))}

      {savedPolygons.map((polygon) =>
        polygon.innerPoints.map((point) => (
          <CircleMarker
            key={`saved-inner-point-${polygon.id}-${point.id}`}
            center={point.point}
            radius={5}
            pathOptions={{
              color: "#1e40af",
              fillColor: "#3b82f6",
              fillOpacity: 1,
            }}
            eventHandlers={{
              click: (event) =>
                onSavedPointClick(
                  polygon.id,
                  point.id,
                  point.point,
                  point.name,
                  point.description,
                  event
                ),
            }}
          >
            <Tooltip direction="top">
              <div className="text-xs">
                <div className="font-semibold">{point.name}</div>
                <div>{point.description}</div>
              </div>
            </Tooltip>
          </CircleMarker>
        ))
      )}
    </MapContainer>
  );
};

type MapInstanceObserverProps = {
  onReady: (map: L.Map) => void;
};

const MapInstanceObserver: FC<MapInstanceObserverProps> = ({ onReady }) => {
  const map = useMap();

  useEffect(() => {
    onReady(map);
  }, [map, onReady]);

  return null;
};
