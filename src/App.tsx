import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";

import { useState } from "react";

import { jsonRpcApi } from "./shared/jsonrpc";
import { usePlotEditor } from "./features/plot-editor/model/use-plot-editor";
import { PlotControls } from "./widgets/plot-controls";
import { PlotSidebar } from "./widgets/plot-sidebar";
import { PlotDialogs } from "./widgets/plot-dialogs";
import { MapScene } from "./widgets/map-scene";

function App() {
  const [viewBound, setViewBound] = useState<Record<"sw" | "ne", [number, number]>>();

  const { data: eventList = [] } = jsonRpcApi.useEventListDefaultQuery(
    {
      sw: viewBound?.sw ?? [],
      ne: viewBound?.ne ?? [],
    },
    { skip: !viewBound, refetchOnMountOrArgChange: true }
  );

  const { state, actions } = usePlotEditor();

  return (
    <div className="w-full h-full relative">
      <PlotControls
        isDrawMode={state.isDrawMode}
        isDraftPolygonClosed={state.isDraftPolygonClosed}
        hasSavedPolygons={state.savedPolygons.length > 0}
        onStartDraw={actions.startDraw}
        onCancelDraw={actions.cancelDraw}
        onOpenSavePlot={() => actions.setPlotDrawer({ isOpen: true })}
        onClearAll={actions.clearAllPlots}
      />

      <PlotSidebar
        plots={state.savedPolygons}
        onSelectPlot={actions.setSelectedPlotId}
        onFocusPolygon={actions.focusPolygon}
        onFocusPoint={actions.focusPoint}
      />

      <MapScene
        eventList={eventList}
        savedPolygons={state.savedPolygons}
        selectedPlotId={state.selectedPlotId}
        draftPolygonPoints={state.draftPolygonPoints}
        draftInnerPoints={state.draftInnerPoints}
        isDraftPolygonClosed={state.isDraftPolygonClosed}
        onMapClick={actions.handleMapClick}
        onChangeBounds={setViewBound}
        onMapReady={actions.setMapInstance}
        onSavedPolygonClick={actions.onSavedPolygonClick}
        onSavedPolygonDoubleClick={actions.onSavedPolygonDoubleClick}
        onSavedPointClick={actions.onSavedPointClick}
      />

      <PlotDialogs
        plotDrawer={state.plotDrawer}
        pointDrawer={state.pointDrawer}
        editPlotDrawer={state.editPlotDrawer}
        draftPolygonPoints={state.draftPolygonPoints}
        draftInnerPoints={state.draftInnerPoints}
        plotName={state.plotName}
        plotDescription={state.plotDescription}
        pointName={state.pointName}
        pointDescription={state.pointDescription}
        editPlotName={state.editPlotName}
        editPlotDescription={state.editPlotDescription}
        onClosePlotDrawer={() => actions.setPlotDrawer({ isOpen: false })}
        onClosePointDrawer={actions.closePointDrawer}
        onCloseEditPlotDrawer={() => actions.setEditPlotDrawer({ isOpen: false, plotId: null })}
        onSavePlot={actions.savePlot}
        onSavePoint={actions.savePoint}
        onSavePlotEdit={actions.savePlotEdit}
        onDeletePlot={actions.deletePlot}
        setPlotName={actions.setPlotName}
        setPlotDescription={actions.setPlotDescription}
        setPointName={actions.setPointName}
        setPointDescription={actions.setPointDescription}
        setEditPlotName={actions.setEditPlotName}
        setEditPlotDescription={actions.setEditPlotDescription}
        canSavePlot={
          state.isDraftPolygonClosed &&
          Boolean(state.plotName.trim()) &&
          Boolean(state.plotDescription.trim())
        }
      />
    </div>
  );
}

export default App;
