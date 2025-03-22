import { configureStore } from "@reduxjs/toolkit";


import { jsonRpcApi } from "@/shared/jsonrpc";

export const store = configureStore({
  reducer: {
    [jsonRpcApi.reducerPath]: jsonRpcApi.reducer,
  },
  middleware: gDM => gDM({ serializableCheck: false }).concat(jsonRpcApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
