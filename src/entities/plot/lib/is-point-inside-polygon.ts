import { LatLngTuple } from "../model/types";

export const isPointInsidePolygon = (
  point: LatLngTuple,
  polygonPoints: LatLngTuple[]
) => {
  if (polygonPoints.length < 3) {
    return false;
  }

  const x = point[1];
  const y = point[0];
  let isInside = false;

  for (
    let current = 0, previous = polygonPoints.length - 1;
    current < polygonPoints.length;
    previous = current++
  ) {
    const currentX = polygonPoints[current][1];
    const currentY = polygonPoints[current][0];
    const previousX = polygonPoints[previous][1];
    const previousY = polygonPoints[previous][0];

    const intersects =
      currentY > y !== previousY > y &&
      x <
        ((previousX - currentX) * (y - currentY)) / (previousY - currentY) +
          currentX;

    if (intersects) {
      isInside = !isInside;
    }
  }

  return isInside;
};
