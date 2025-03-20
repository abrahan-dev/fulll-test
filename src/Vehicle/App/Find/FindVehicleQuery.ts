import type { Query } from "../../../shared/Domain/Bus/Query/Query.ts";

export class FindVehicleQuery implements Query {
  constructor(private readonly plateNumber: string) {}

  getPlateNumber(): string {
    return this.plateNumber;
  }
}
