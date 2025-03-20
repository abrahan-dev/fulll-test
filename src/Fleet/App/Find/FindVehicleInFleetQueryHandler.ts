import type { QueryHandler } from "../../../shared/Domain/Bus/Query/QueryHandler.ts";
import type { VehicleFinder } from "../../../Vehicle/App/Find/VehicleFinder.ts";
import type { FindVehicleInFleetQuery } from "./FindVehicleInFleetQuery.ts";
import type { Vehicle } from "../../../Vehicle/Domain/Vehicle.ts";
import type { FleetFinder } from "./FleetFinder.ts";
import { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import { VehicleInFleetNotFound } from "../../Domain/VehicleInFleetNotFound.ts";
import { VehiclePlateNumber } from "../../../Vehicle/Domain/ValueObject/VehiclePlateNumber.ts";

export class FindVehicleInFleetQueryHandler implements QueryHandler {
  constructor(
    private readonly vehicleFinder: VehicleFinder,
    private readonly fleetFinder: FleetFinder,
  ) {}

  async handle(query: FindVehicleInFleetQuery): Promise<Vehicle> {
    const vehicle = await this.vehicleFinder.find(
      new VehiclePlateNumber(query.getPlateNumber()),
    );
    const fleet = await this.fleetFinder.find(new FleetId(query.getFleetId()));

    if (!fleet.hasVehicle(vehicle.getId())) {
      throw new VehicleInFleetNotFound(vehicle.getId(), fleet.getId());
    }

    return vehicle;
  }
}
