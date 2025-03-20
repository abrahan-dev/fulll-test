import type { FleetId } from "./ValueObject/FleetId.ts";
import type { VehicleId } from "../../Vehicle/Domain/ValueObject/VehicleId.ts";

export class VehicleInFleetNotFound extends Error {
  constructor(vehicleId: VehicleId, fleetId: FleetId) {
    super(
      `Vehicle with id ${vehicleId.getValue()} not found in fleet with id ${fleetId.getValue()}`,
    );
  }
}
