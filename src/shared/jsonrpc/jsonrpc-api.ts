import { createApi } from "@reduxjs/toolkit/query/react";

import { JsonRpcMethodMnemocode, jsonRpcMethodBuilder } from "./jsonrpc-method";
import { jsonRpcBaseQuery } from "./base-query";
import {
  EventCreateDefaultRequest,
  EventCreateDefaultResponse,
  EventListDefaultRequest,
  EventListDefaultResponse,
} from "./types/event";

export const jsonRpcApi = createApi({
  reducerPath: "jsonRpc",
  baseQuery: jsonRpcBaseQuery,
  tagTypes: ["UserNotification"],
  endpoints: (builder) => ({
    [jsonRpcMethodBuilder.eventCreateDefault]: builder.query<
      EventCreateDefaultResponse,
      EventCreateDefaultRequest
    >({
      query: (args) => ({
        method: JsonRpcMethodMnemocode.EventCreateDefault,
        params: { ...args },
      }),
    }),

    [jsonRpcMethodBuilder.eventListDefault]: builder.query<
      EventListDefaultResponse,
      EventListDefaultRequest
    >({
      query: (args) => ({
        method: JsonRpcMethodMnemocode.EventListDefault,
        params: { ...args },
      }),
    }),
  }),
});
