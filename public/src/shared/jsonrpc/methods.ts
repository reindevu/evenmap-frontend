import { eventCreateDefault,eventListDefault } from "@routes";
import jayson from "jayson";

export type JsonRpcMethodsType = { [methodName: string]: jayson.MethodLike };

export enum JsonRpcMethodMnemocode {
  EventCreateDefault = "Event.Create.Default",
  EventListDefault = "Event.List.Default",
}

export const jsonRpcMethods: JsonRpcMethodsType = {
  [JsonRpcMethodMnemocode.EventCreateDefault]: eventCreateDefault,
  [JsonRpcMethodMnemocode.EventListDefault]: eventListDefault,
};
