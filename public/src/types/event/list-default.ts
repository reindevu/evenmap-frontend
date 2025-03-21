export interface EventListDefaultRequest {
  southWestLngLat: number[];
  northEastLngLat: number[];
}

export interface EventListDefaultResponse
  extends Array<{
    id: string;
    name: string;
    type: string;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    coordinates: number[];
  }> {}
