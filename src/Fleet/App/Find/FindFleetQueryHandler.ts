import type { QueryHandler } from "../../../shared/Domain/Bus/Query/QueryHandler.ts";
import type { FleetFinder } from "./FleetFinder.ts";
import { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import type { FindFleetQuery } from "./FindFleetQuery.ts";
import type { Fleet } from "../../Domain/Fleet.ts";

export class FindFleetQueryHandler implements QueryHandler {
  constructor(private readonly fleetFinder: FleetFinder) {}

  async handle(query: FindFleetQuery): Promise<Fleet> {
    return await this.fleetFinder.find(new FleetId(query.getFleetId()));
  }
}
