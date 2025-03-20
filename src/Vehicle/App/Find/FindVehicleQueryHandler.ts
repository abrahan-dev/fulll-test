import type { QueryHandler } from "../../../shared/Domain/Bus/Query/QueryHandler.ts";
import type { VehicleFinder } from "./VehicleFinder.ts";
import type { FindVehicleQuery } from "./FindVehicleQuery.ts";
import type { Vehicle } from "../../Domain/Vehicle.ts";
import { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class FindVehicleQueryHandler implements QueryHandler {
  constructor(private readonly finder: VehicleFinder) {}

  async find(query: FindVehicleQuery): Promise<Vehicle> {
    return await this.finder.find(
      new VehiclePlateNumber(query.getPlateNumber()),
    );
  }
}
