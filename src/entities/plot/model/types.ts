export type LatLngTuple = [number, number];

export type PlotPoint = {
  id: number;
  point: LatLngTuple;
  name: string;
  description: string;
};

export type SavedPlot = {
  id: number;
  name: string;
  description: string;
  boundaryPoints: LatLngTuple[];
  innerPoints: PlotPoint[];
};

export type PointDrawerState = {
  isOpen: boolean;
  plotId: number | null;
  point: LatLngTuple | null;
  pointId: number | null;
  mode: "create" | "edit";
};

export type PlotDrawerState = {
  isOpen: boolean;
};

export type EditPlotDrawerState = {
  isOpen: boolean;
  plotId: number | null;
};
