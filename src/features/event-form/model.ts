import { InferType, object, string } from "yup";

export const schema = object().shape({
  name: string().default("").required("Название обязательно"),
  typeMnemocode: string().default("").required("Тип обязателен"),
  description: string().default("").required("Описание обязательно"),

  dateFrom: string()
    .default("")
    .required("Дата начала обязательна")
    .typeError("Неверный формат даты"),

  dateTo: string()
    .default("")
    .required("Дата окончания обязательна")
    .typeError("Неверный формат даты"),
});

export type FormModel = InferType<typeof schema>;

export const defaultValues = schema.getDefault();
