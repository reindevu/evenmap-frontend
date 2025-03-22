import { BaseQueryFn } from "@reduxjs/toolkit/query";

import { jsonRpcLog } from "./jsonrpc-log";
import { JSONRPCRequest, JSONRPCResponse } from "./jsonrpc-method";

export const jsonRpcBaseQuery: BaseQueryFn<
  { method: string; params?: unknown },
  unknown,
  { code: number; message: string }
> = async ({ method, params }) => {
  try {
    // Формируем тело запроса в формате JSON‑RPC
    const body: JSONRPCRequest = {
      jsonrpc: "2.0",
      method,
      params,
      id: Date.now(), // или любое уникальное значение
    };

    jsonRpcLog(method, params, "blue");

    const response = await fetch("http://localhost:50051/jsonrpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const json: JSONRPCResponse<unknown> = await response.json();

    if (json.error) {
      jsonRpcLog(method, json.error, "red");
      return {
        error: {
          code: 400,
          message: json.error.message,
          data: json.error.data,
          errorTypeMnemocode: json.error.errorTypeMnemocode,
        },
      };
    }

    jsonRpcLog(method, json.result, "green");
    return { data: json.result };
  } catch (e) {
    console.log(e);
    return { error: { code: 500, message: "" } };
  }
};
