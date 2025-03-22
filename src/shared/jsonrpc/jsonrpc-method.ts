export interface JSONRPCRequest {
  jsonrpc: "2.0";
  method: string;
  params?: unknown;
  id: number | string;
}

export interface JSONRPCResponse<T> {
  jsonrpc: "2.0";
  result?: T;
  error?: JsonRpcError;
  id: number | string;
}

export interface JsonRpcError {
  code: number;
  message: string;
  data: any;
  errorTypeMnemocode: string;
}

export enum JsonRpcMethodMnemocode {
  EventCreateDefault = "Event.Create.Default",
  EventListDefault = "Event.List.Default",
}

type CamelCase<S extends string> = S extends `${infer F}${infer R}` ? `${Lowercase<F>}${R}` : S;

type EnumObject<T extends { [key: string]: string }> = {
  [K in keyof T as CamelCase<K & string>]: CamelCase<K & string>;
};

function convertEnumToCamelCase<T extends { [key: string]: string }>(enumObj: T): EnumObject<T> {
  const result = {} as any;
  Object.keys(enumObj).forEach(key => {
    const newKey = key.charAt(0).toLowerCase() + key.slice(1);
    result[newKey] = newKey;
  });
  return result;
}

export const jsonRpcMethodBuilder = convertEnumToCamelCase(JsonRpcMethodMnemocode);
