import type { Query } from "../../../shared/Domain/Bus/Query/Query.ts";

export class FindFleetQuery implements Query {
  constructor(private readonly fleetId: string) {}

  getFleetId(): string {
    return this.fleetId;
  }
}
