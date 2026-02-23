import { FC } from "react";

import { SavedPlot } from "@/entities/plot/model/types";
import { EyeIcon } from "@/shared/ui/eye-icon";

type Props = {
  plots: SavedPlot[];
  onSelectPlot: (plotId: number) => void;
  onFocusPolygon: (plot: SavedPlot) => void;
  onFocusPoint: (plotId: number, point: [number, number]) => void;
};

export const PlotSidebar: FC<Props> = ({
  plots,
  onSelectPlot,
  onFocusPolygon,
  onFocusPoint,
}) => {
  return (
    <aside className="absolute right-4 top-4 z-[1000] w-96 max-h-[80vh] overflow-auto rounded-xl bg-white/90 p-3 shadow-lg backdrop-blur-sm">
      <h2 className="text-sm font-semibold">Сохраненные полигоны</h2>
      <div className="mt-2 flex flex-col gap-2">
        {plots.length === 0 && (
          <p className="text-xs text-gray-500">Пока нет сохраненных полигонов</p>
        )}

        {plots.map((plot) => (
          <details
            key={`plot-list-${plot.id}`}
            className="rounded-md border border-gray-200 bg-white"
          >
            <summary
              className="cursor-pointer px-3 py-2 text-sm"
              onClick={() => onSelectPlot(plot.id)}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-semibold">{plot.name}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({plot.innerPoints.length} точек)
                  </span>
                </div>
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onFocusPolygon(plot);
                  }}
                  title="Показать полигон"
                >
                  <EyeIcon className="h-4 w-4" />
                </button>
              </div>
            </summary>
            <div className="border-t border-gray-100 px-3 py-2">
              <p className="text-xs text-gray-600">{plot.description}</p>
              <ul className="mt-2 space-y-2">
                {plot.innerPoints.length === 0 && (
                  <li className="text-xs text-gray-400">Внутренних точек нет</li>
                )}
                {plot.innerPoints.map((point) => (
                  <li key={`plot-point-list-${plot.id}-${point.id}`} className="text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{point.name}</p>
                        <p className="text-gray-600">{point.description}</p>
                        <p className="font-mono text-gray-500">
                          {point.point[0].toFixed(6)}, {point.point[1].toFixed(6)}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="rounded p-1 text-gray-600 hover:bg-gray-100"
                        onClick={() => onFocusPoint(plot.id, point.point)}
                        title="Показать точку"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </aside>
  );
};
