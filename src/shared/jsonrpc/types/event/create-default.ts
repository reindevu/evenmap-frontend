export interface EventCreateDefaultRequest {
  name: string;
  typeMnemocode: string;
  description: string;
  dateFrom: string;
  dateTo: string;
  lngLat: [number, number];
}

export interface EventCreateDefaultResponse {
  id: string;
}
