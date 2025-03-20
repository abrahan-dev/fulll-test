import type { FleetId } from "./ValueObject/FleetId.ts";

export class FleetNotFound extends Error {
  constructor(fleetId: FleetId) {
    super(`Fleet with id ${fleetId.getValue()} not found`);
  }
}
