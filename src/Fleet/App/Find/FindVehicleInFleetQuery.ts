import type { Query } from "../../../shared/Domain/Bus/Query/Query.ts";

export class FindVehicleInFleetQuery implements Query {
  constructor(
    private readonly plateNumber: string,
    private readonly fleetId: string,
  ) {}

  getPlateNumber(): string {
    return this.plateNumber;
  }

  getFleetId(): string {
    return this.fleetId;
  }
}
