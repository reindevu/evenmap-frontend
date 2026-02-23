import { FC } from "react";

type Props = {
  isDrawMode: boolean;
  isDraftPolygonClosed: boolean;
  hasSavedPolygons: boolean;
  onStartDraw: () => void;
  onCancelDraw: () => void;
  onOpenSavePlot: () => void;
  onClearAll: () => void;
};

export const PlotControls: FC<Props> = ({
  isDrawMode,
  isDraftPolygonClosed,
  hasSavedPolygons,
  onStartDraw,
  onCancelDraw,
  onOpenSavePlot,
  onClearAll,
}) => {
  return (
    <>
      {!isDrawMode && (
        <div className="absolute bottom-4 right-4 z-[1001]">
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white shadow-lg hover:bg-green-700"
            onClick={onStartDraw}
          >
            Начать рисование участка
          </button>
        </div>
      )}

      {isDrawMode && (
        <div className="absolute bottom-4 right-4 z-[1001] bg-white/90 rounded-xl p-3 shadow-lg">
          <div className="text-xs text-gray-700">
            {isDraftPolygonClosed
              ? "Полигон замкнут. Ставьте точки внутри и сохраните."
              : "Ставьте точки. Для замыкания кликните рядом с первой точкой."}
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 z-[1000] bg-white/90 rounded-xl p-3 shadow-lg flex items-center gap-2">
        {isDrawMode && (
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onCancelDraw}
          >
            Отменить
          </button>
        )}

        {hasSavedPolygons && (
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClearAll}
          >
            Очистить участки
          </button>
        )}

        {isDrawMode && isDraftPolygonClosed && (
          <button
            type="button"
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={onOpenSavePlot}
          >
            Форма сохранения
          </button>
        )}
      </div>
    </>
  );
};
