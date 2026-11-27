// d3-geo-projection ships no types; only the raw projection the map Short uses is declared.
declare module "d3-geo-projection" {
  import type { GeoRawProjection } from "d3-geo";
  export const geoRobinsonRaw: GeoRawProjection;
}
