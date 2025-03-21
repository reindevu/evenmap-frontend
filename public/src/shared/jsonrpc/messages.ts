export enum JsonRpcErrorTypeMnemocode {
  DirectoryNotFount = "DirectoryNotFount",
  DirectoryValueNotFound = "DirectoryValueNotFound",
  UnknownError = "UnknownError",
  FieldNotFound = "FieldNotFound",
  EntityNotFound = "EntityNotFound"
}

export const jsonRpcErrorMessage: Record<JsonRpcErrorTypeMnemocode, string> = {
  DirectoryNotFount: "Справочник не найден.",
  DirectoryValueNotFound: "Справочник не найден.",
  UnknownError: "Неизвестная ошибка.",
  FieldNotFound: "Поле не найдено.",
  EntityNotFound: "Сущность не найдена."
};

export enum JsonRpcResultTypeMnemocode {
  DataUpdatedSuccessfully = "DataUpdatedSuccessfully",

  QueryExecutedSuccessfully = "QueryExecutedSuccessfully",
}

export const jsonRpcResultMessage: Record<JsonRpcResultTypeMnemocode, string> = {
  DataUpdatedSuccessfully: "Данные успешно обновлены.",
  QueryExecutedSuccessfully: "Запрос успешно выполнен.",
};
