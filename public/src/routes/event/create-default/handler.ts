import { schema } from "./model";
import { Event } from "@models";

import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";
import { EventCreateDefaultRequest, EventCreateDefaultResponse } from "types";

export async function eventCreateDefault(
  args: EventCreateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const eventCreateDoc = await Event.create({
      name: args.name,
      type: args.type,
      description: args.description,
      dateFrom: args.dateFrom,
      dateTo: args.dateTo,
      location: {
        type: "Point",
        coordinates: args.coordinates,
      },
    });

    jsonRpcResult<EventCreateDefaultResponse>({
      callback,
      result: {
        id: eventCreateDoc.id,
      },
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError,
    });
  }
}
