import { JsonRpcCallback } from "./global-types";
import { JsonRpcErrorTypeMnemocode, JsonRpcResultTypeMnemocode, jsonRpcErrorMessage } from "./messages";

type JsonRpcErrorType<T> = { errorTypeMnemocode: JsonRpcErrorTypeMnemocode; callback: JsonRpcCallback; data?: T };

export const jsonRpcError = <T>(props: JsonRpcErrorType<T>) => {
  return props.callback({
    code: -32000,
    message: jsonRpcErrorMessage[props.errorTypeMnemocode],
    errorTypeMnemocode: props.errorTypeMnemocode,
    data: props.data,
  });
};

type JsonRpcSuccessType<T> = {
  callback: JsonRpcCallback;
  resultTypeMnemocode?: JsonRpcResultTypeMnemocode;
  result: T;
};

export const jsonRpcResult = <T>(props: JsonRpcSuccessType<T>) => {
  return props.callback(null, props.result);
};
