export interface MapMarkerType {
  className: string;
  coordinates: [number, number];
  backgroundImage: string;
  width: string;
  height: string;
  id: number;
  popup: string;
}

export interface MapSearchType {
  id: string;
  label: string;
  county: string;
  region: string;
  popup: string;
  lat: string;
  lon: string;
}
