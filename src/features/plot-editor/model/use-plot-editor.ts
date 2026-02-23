import { useRef, useState } from "react";
import L from "leaflet";

import {
  EditPlotDrawerState,
  LatLngTuple,
  PointDrawerState,
  PlotDrawerState,
  SavedPlot,
} from "@/entities/plot/model/types";
import { isPointInsidePolygon } from "@/entities/plot/lib/is-point-inside-polygon";

const CLOSE_DISTANCE_IN_METERS = 25;

export const usePlotEditor = () => {
  const mapRef = useRef<L.Map | null>(null);
  const polygonClickTimeoutRef = useRef<number | null>(null);

  const [plotDrawer, setPlotDrawer] = useState<PlotDrawerState>({
    isOpen: false,
  });
  const [pointDrawer, setPointDrawer] = useState<PointDrawerState>({
    isOpen: false,
    plotId: null,
    point: null,
    pointId: null,
    mode: "create",
  });
  const [editPlotDrawer, setEditPlotDrawer] = useState<EditPlotDrawerState>({
    isOpen: false,
    plotId: null,
  });

  const [isDrawMode, setIsDrawMode] = useState(false);
  const [isDraftPolygonClosed, setIsDraftPolygonClosed] = useState(false);
  const [draftPolygonPoints, setDraftPolygonPoints] = useState<LatLngTuple[]>([]);
  const [draftInnerPoints, setDraftInnerPoints] = useState<LatLngTuple[]>([]);

  const [plotName, setPlotName] = useState("");
  const [plotDescription, setPlotDescription] = useState("");
  const [pointName, setPointName] = useState("");
  const [pointDescription, setPointDescription] = useState("");
  const [editPlotName, setEditPlotName] = useState("");
  const [editPlotDescription, setEditPlotDescription] = useState("");

  const [savedPolygons, setSavedPolygons] = useState<SavedPlot[]>([]);
  const [selectedPlotId, setSelectedPlotId] = useState<number | null>(null);

  const closePointDrawer = () => {
    setPointDrawer({
      isOpen: false,
      plotId: null,
      point: null,
      pointId: null,
      mode: "create",
    });
  };

  const closeEditPlotDrawer = () => {
    setEditPlotDrawer({ isOpen: false, plotId: null });
  };

  const startDraw = () => {
    setIsDrawMode(true);
    setIsDraftPolygonClosed(false);
    setDraftPolygonPoints([]);
    setDraftInnerPoints([]);
    setPlotName("");
    setPlotDescription("");
    setSelectedPlotId(null);
    setPlotDrawer({ isOpen: false });
    closePointDrawer();
    closeEditPlotDrawer();
  };

  const cancelDraw = () => {
    setIsDrawMode(false);
    setIsDraftPolygonClosed(false);
    setDraftPolygonPoints([]);
    setDraftInnerPoints([]);
    setPlotName("");
    setPlotDescription("");
    setPlotDrawer({ isOpen: false });
    closePointDrawer();
    closeEditPlotDrawer();
  };

  const savePlot = () => {
    if (!isDraftPolygonClosed || draftPolygonPoints.length < 3) {
      return;
    }

    if (!plotName.trim() || !plotDescription.trim()) {
      return;
    }

    const nextPlot: SavedPlot = {
      id: Date.now(),
      name: plotName.trim(),
      description: plotDescription.trim(),
      boundaryPoints: draftPolygonPoints,
      innerPoints: draftInnerPoints.map((point, index) => ({
        id: Date.now() + index,
        point,
        name: `Точка ${index + 1}`,
        description: "Добавлена при создании полигона",
      })),
    };

    setSavedPolygons((state) => [...state, nextPlot]);
    setIsDrawMode(false);
    setIsDraftPolygonClosed(false);
    setDraftPolygonPoints([]);
    setDraftInnerPoints([]);
    setPlotName("");
    setPlotDescription("");
    setPlotDrawer({ isOpen: false });
  };

  const handleMapClick = (latlng: L.LatLng) => {
    const nextPoint: LatLngTuple = [latlng.lat, latlng.lng];

    if (!isDrawMode) {
      return;
    }

    if (isDraftPolygonClosed) {
      if (isPointInsidePolygon(nextPoint, draftPolygonPoints)) {
        setDraftInnerPoints((state) => [...state, nextPoint]);
      }

      return;
    }

    if (draftPolygonPoints.length >= 3) {
      const firstPoint = draftPolygonPoints[0];
      const distance = L.latLng(nextPoint[0], nextPoint[1]).distanceTo(
        L.latLng(firstPoint[0], firstPoint[1])
      );

      if (distance <= CLOSE_DISTANCE_IN_METERS) {
        setIsDraftPolygonClosed(true);
        setPlotDrawer({ isOpen: true });
        return;
      }
    }

    setDraftPolygonPoints((state) => [...state, nextPoint]);
  };

  const savePoint = () => {
    if (
      !pointDrawer.plotId ||
      !pointDrawer.point ||
      !pointName.trim() ||
      !pointDescription.trim()
    ) {
      return;
    }

    const point = pointDrawer.point;
    const plotId = pointDrawer.plotId;
    const pointId = pointDrawer.pointId;

    setSavedPolygons((state) =>
      state.map((plot) => {
        if (plot.id !== plotId) {
          return plot;
        }

        if (pointDrawer.mode === "edit" && pointId !== null) {
          return {
            ...plot,
            innerPoints: plot.innerPoints.map((savedPoint) =>
              savedPoint.id === pointId
                ? {
                    ...savedPoint,
                    name: pointName.trim(),
                    description: pointDescription.trim(),
                  }
                : savedPoint
            ),
          };
        }

        return {
          ...plot,
          innerPoints: [
            ...plot.innerPoints,
            {
              id: Date.now(),
              point,
              name: pointName.trim(),
              description: pointDescription.trim(),
            },
          ],
        };
      })
    );

    setPointName("");
    setPointDescription("");
    closePointDrawer();
  };

  const openEditPlotDialog = (plot: SavedPlot) => {
    setEditPlotName(plot.name);
    setEditPlotDescription(plot.description);
    setEditPlotDrawer({ isOpen: true, plotId: plot.id });
  };

  const savePlotEdit = () => {
    if (
      !editPlotDrawer.plotId ||
      !editPlotName.trim() ||
      !editPlotDescription.trim()
    ) {
      return;
    }

    const plotId = editPlotDrawer.plotId;
    setSavedPolygons((state) =>
      state.map((plot) =>
        plot.id === plotId
          ? {
              ...plot,
              name: editPlotName.trim(),
              description: editPlotDescription.trim(),
            }
          : plot
      )
    );
    closeEditPlotDrawer();
  };

  const deletePlot = () => {
    if (!editPlotDrawer.plotId) {
      return;
    }

    const plotId = editPlotDrawer.plotId;
    setSavedPolygons((state) => state.filter((plot) => plot.id !== plotId));
    if (selectedPlotId === plotId) {
      setSelectedPlotId(null);
    }
    closeEditPlotDrawer();
  };

  const focusPolygon = (plot: SavedPlot) => {
    if (!mapRef.current || plot.boundaryPoints.length < 3) {
      return;
    }

    const bounds = L.latLngBounds(
      plot.boundaryPoints.map((point) => L.latLng(point[0], point[1]))
    );
    mapRef.current.fitBounds(bounds, { padding: [40, 40] });
    setSelectedPlotId(plot.id);
  };

  const focusPoint = (plotId: number, point: LatLngTuple) => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.setView([point[0], point[1]], 18, { animate: true });
    setSelectedPlotId(plotId);
  };

  const clearAllPlots = () => {
    setSavedPolygons([]);
    setSelectedPlotId(null);
    closeEditPlotDrawer();
    closePointDrawer();
  };

  const onSavedPolygonClick = (polygon: SavedPlot, event: L.LeafletMouseEvent) => {
    L.DomEvent.stopPropagation(event.originalEvent);
    setSelectedPlotId(polygon.id);

    if (isDrawMode) {
      return;
    }

    if (polygonClickTimeoutRef.current !== null) {
      window.clearTimeout(polygonClickTimeoutRef.current);
    }

    polygonClickTimeoutRef.current = window.setTimeout(() => {
      const clickedPoint: LatLngTuple = [event.latlng.lat, event.latlng.lng];

      if (!isPointInsidePolygon(clickedPoint, polygon.boundaryPoints)) {
        return;
      }

      setPointName("");
      setPointDescription("");
      setPointDrawer({
        isOpen: true,
        plotId: polygon.id,
        point: clickedPoint,
        pointId: null,
        mode: "create",
      });
    }, 220);
  };

  const onSavedPolygonDoubleClick = (
    polygon: SavedPlot,
    event: L.LeafletMouseEvent
  ) => {
    L.DomEvent.stopPropagation(event.originalEvent);
    L.DomEvent.preventDefault(event.originalEvent);
    setSelectedPlotId(polygon.id);

    if (polygonClickTimeoutRef.current !== null) {
      window.clearTimeout(polygonClickTimeoutRef.current);
      polygonClickTimeoutRef.current = null;
    }

    openEditPlotDialog(polygon);
  };

  const onSavedPointClick = (
    plotId: number,
    pointId: number,
    point: LatLngTuple,
    name: string,
    description: string,
    event: L.LeafletMouseEvent
  ) => {
    L.DomEvent.stopPropagation(event.originalEvent);
    setSelectedPlotId(plotId);
    setPointName(name);
    setPointDescription(description);
    setPointDrawer({
      isOpen: true,
      plotId,
      point,
      pointId,
      mode: "edit",
    });
  };

  const setMapInstance = (map: L.Map) => {
    mapRef.current = map;
  };

  return {
    state: {
      plotDrawer,
      pointDrawer,
      editPlotDrawer,
      isDrawMode,
      isDraftPolygonClosed,
      draftPolygonPoints,
      draftInnerPoints,
      plotName,
      plotDescription,
      pointName,
      pointDescription,
      editPlotName,
      editPlotDescription,
      savedPolygons,
      selectedPlotId,
    },
    actions: {
      setPlotDrawer,
      setPointDrawer,
      setEditPlotDrawer,
      setPlotName,
      setPlotDescription,
      setPointName,
      setPointDescription,
      setEditPlotName,
      setEditPlotDescription,
      setSelectedPlotId,
      setMapInstance,
      startDraw,
      cancelDraw,
      savePlot,
      savePoint,
      savePlotEdit,
      deletePlot,
      focusPolygon,
      focusPoint,
      clearAllPlots,
      closePointDrawer,
      onSavedPolygonClick,
      onSavedPolygonDoubleClick,
      onSavedPointClick,
      handleMapClick,
    },
  };
};
