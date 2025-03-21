import { schema } from "./model";
import { Event } from "@models";

import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";
import { EventListDefaultRequest, EventListDefaultResponse } from "types";

export async function eventListDefault(
  args: EventListDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const eventDocs = await Event.find({
      location: {
        $geoWithin: {
          $box: [
            [args.southWestLngLat[0], args.southWestLngLat[1]],
            [args.northEastLngLat[0], args.southWestLngLat[1]],
          ],
        },
      },
    });

    jsonRpcResult<EventListDefaultResponse>({
      callback,
      result: eventDocs.map(key => ({
        id: key.id,
        type: key.type,
        name: key.name,
        description: key.description,
        dateFrom: key.dateFrom,
        dateTo: key.dateTo,
        coordinates: key.location.coordinates
      }))
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError,
    });
  }
}
