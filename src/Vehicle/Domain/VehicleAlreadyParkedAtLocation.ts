import type { VehicleId } from "./ValueObject/VehicleId.ts";
import type { GeoLocation } from "../../shared/Domain/ValueObject/GeoLocation.ts";

export class VehicleAlreadyParkedAtLocation extends Error {
  constructor(vehicleId: VehicleId, location: GeoLocation) {
    super(
      `Vehicle with id ${vehicleId.getValue()} is already parked at location: latitude ${location.getLatitude()}, longitude ${location.getLongitude()}, altitude ${location.getAltitude() ?? "unknown"}`,
    );
  }
}
