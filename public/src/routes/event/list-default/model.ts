import { array, number, object } from "yup";

export const schema = object().shape({
  southWestLngLat: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
  northEastLngLat: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
});
