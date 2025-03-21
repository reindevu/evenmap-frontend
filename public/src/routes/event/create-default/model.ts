import { array, date, number, object, ref, string } from "yup";

export const schema = object().shape({
  name: string().required("Название обязательно"),
  type: string().required("Тип обязателен"),
  description: string().required("Описание обязательно"),

  dateTimeFrom: date()
    .required("Дата начала обязательна")
    .typeError("Неверный формат даты"),

  dateTimeTo: date()
    .required("Дата окончания обязательна")
    .typeError("Неверный формат даты")
    .min(ref("dateTimeFrom"), "Дата окончания должна быть после даты начала"),

  coordinates: array()
    .of(number().required("Координата обязательна"))
    .length(2, "Должно быть две координаты: [долгота, широта]")
    .required("Координаты обязательны"),
});
