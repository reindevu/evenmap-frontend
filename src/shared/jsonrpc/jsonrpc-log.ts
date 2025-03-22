export const jsonRpcLog = (method: string, params: unknown, color: "blue" | "red" | "green"): void => {
  console.groupCollapsed(`%c${method}`, `color: ${color}`);
  console.log(params);
  console.groupEnd();
};
