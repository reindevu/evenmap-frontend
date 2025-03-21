
import { Request } from "express";

export type JsonRpcCallback = <T>(err: any, result?: T) => void;
export type JsonRpcContext = {
  headers?: Request["headers"];
};
