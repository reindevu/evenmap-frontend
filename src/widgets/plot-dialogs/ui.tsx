import { FC } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import {
  EditPlotDrawerState,
  LatLngTuple,
  PointDrawerState,
  PlotDrawerState,
} from "@/entities/plot/model/types";

type Props = {
  plotDrawer: PlotDrawerState;
  pointDrawer: PointDrawerState;
  editPlotDrawer: EditPlotDrawerState;
  draftPolygonPoints: LatLngTuple[];
  draftInnerPoints: LatLngTuple[];
  plotName: string;
  plotDescription: string;
  pointName: string;
  pointDescription: string;
  editPlotName: string;
  editPlotDescription: string;
  onClosePlotDrawer: () => void;
  onClosePointDrawer: () => void;
  onCloseEditPlotDrawer: () => void;
  onSavePlot: () => void;
  onSavePoint: () => void;
  onSavePlotEdit: () => void;
  onDeletePlot: () => void;
  setPlotName: (value: string) => void;
  setPlotDescription: (value: string) => void;
  setPointName: (value: string) => void;
  setPointDescription: (value: string) => void;
  setEditPlotName: (value: string) => void;
  setEditPlotDescription: (value: string) => void;
  canSavePlot: boolean;
};

export const PlotDialogs: FC<Props> = ({
  plotDrawer,
  pointDrawer,
  editPlotDrawer,
  draftPolygonPoints,
  draftInnerPoints,
  plotName,
  plotDescription,
  pointName,
  pointDescription,
  editPlotName,
  editPlotDescription,
  onClosePlotDrawer,
  onClosePointDrawer,
  onCloseEditPlotDrawer,
  onSavePlot,
  onSavePoint,
  onSavePlotEdit,
  onDeletePlot,
  setPlotName,
  setPlotDescription,
  setPointName,
  setPointDescription,
  setEditPlotName,
  setEditPlotDescription,
  canSavePlot,
}) => {
  return (
    <>
      <Dialog open={plotDrawer.isOpen} onClose={onClosePlotDrawer} className="relative z-[1200]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold">Сохранение участка</DialogTitle>

            <div className="mt-4 flex max-h-[70vh] flex-col gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Название</span>
                <input
                  type="text"
                  value={plotName}
                  onChange={(event) => setPlotName(event.target.value)}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                  placeholder="Например: Участок 1"
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Описание</span>
                <textarea
                  value={plotDescription}
                  onChange={(event) => setPlotDescription(event.target.value)}
                  className="min-h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Краткое описание участка"
                />
              </label>

              <p className="text-sm text-gray-700">
                Граничных точек: <span className="font-semibold">{draftPolygonPoints.length}</span>
                {" • "}
                Внутренних точек: <span className="font-semibold">{draftInnerPoints.length}</span>
              </p>

              <div className="max-h-48 overflow-auto rounded-md border border-gray-200 p-3 text-xs font-mono">
                {draftPolygonPoints.map((point, index) => (
                  <p key={`coord-${index}`}>
                    {index + 1}. {point[0].toFixed(6)}, {point[1].toFixed(6)}
                  </p>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClosePlotDrawer}
                >
                  Закрыть
                </button>

                <button
                  type="button"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={onSavePlot}
                  disabled={!canSavePlot}
                >
                  Сохранить участок
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={pointDrawer.isOpen} onClose={onClosePointDrawer} className="relative z-[1200]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold">
              {pointDrawer.mode === "edit" ? "Редактирование точки" : "Новая точка в полигоне"}
            </DialogTitle>

            <div className="mt-4 flex flex-col gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Название точки</span>
                <input
                  type="text"
                  value={pointName}
                  onChange={(event) => setPointName(event.target.value)}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                  placeholder="Например: Колодец"
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Описание точки</span>
                <textarea
                  value={pointDescription}
                  onChange={(event) => setPointDescription(event.target.value)}
                  className="min-h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="Описание точки внутри участка"
                />
              </label>

              {pointDrawer.point && (
                <p className="text-xs font-mono text-gray-600">
                  Координаты: {pointDrawer.point[0].toFixed(6)}, {" "}
                  {pointDrawer.point[1].toFixed(6)}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={onClosePointDrawer}
                >
                  Закрыть
                </button>

                <button
                  type="button"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  onClick={onSavePoint}
                  disabled={!pointName.trim() || !pointDescription.trim()}
                >
                  {pointDrawer.mode === "edit" ? "Сохранить изменения" : "Сохранить точку"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Dialog open={editPlotDrawer.isOpen} onClose={onCloseEditPlotDrawer} className="relative z-[1200]">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold">Редактирование полигона</DialogTitle>

            <div className="mt-4 flex flex-col gap-4">
              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Название</span>
                <input
                  type="text"
                  value={editPlotName}
                  onChange={(event) => setEditPlotName(event.target.value)}
                  className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm"
                />
              </label>

              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">Описание</span>
                <textarea
                  value={editPlotDescription}
                  onChange={(event) => setEditPlotDescription(event.target.value)}
                  className="min-h-24 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                />
              </label>

              <div className="flex justify-between gap-2">
                <button
                  type="button"
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                  onClick={onDeletePlot}
                >
                  Удалить полигон
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={onCloseEditPlotDrawer}
                  >
                    Закрыть
                  </button>

                  <button
                    type="button"
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    onClick={onSavePlotEdit}
                    disabled={!editPlotName.trim() || !editPlotDescription.trim()}
                  >
                    Сохранить
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
