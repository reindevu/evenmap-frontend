export interface EventCreateDefaultRequest {
  name: string;
  type: string;
  description: string;
  dateFrom: Date;
  dateTo: Date;
  coordinates: number[];
}

export interface EventCreateDefaultResponse {
  id: string
}