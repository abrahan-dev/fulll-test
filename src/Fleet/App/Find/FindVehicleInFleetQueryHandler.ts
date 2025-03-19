import type {QueryHandler} from "../../../shared/Domain/Bus/Query/QueryHandler.ts";
import type {VehicleFinder} from "../../../Vehicle/App/Find/VehicleFinder.ts";
import type {FindVehicleInFleetQuery} from "./FindVehicleInFleetQuery.ts";
import type {Vehicle} from "../../../Vehicle/Domain/Vehicle.ts";
import {VehicleId} from "../../../Vehicle/Domain/ValueObject/VehicleId.ts";
import type {FleetFinder} from "./FleetFinder.ts";
import {FleetId} from "../../Domain/ValueObject/FleetId.ts";
import {VehicleInFleetNotFound} from "../../Domain/VehicleInFleetNotFound.ts";

export class FindVehicleInFleetQueryHandler implements QueryHandler {
    constructor(private readonly finder: VehicleFinder, private readonly fleetFinder: FleetFinder) {}

    async handle(query: FindVehicleInFleetQuery): Promise<Vehicle> {
        const vehicle = this.finder.find(new VehicleId(query.getVehicleId()));
        const fleet = await this.fleetFinder.find(new FleetId(query.getVehicleId()));

        if (!fleet.hasVehicle(vehicle.getId())) {
            throw new VehicleInFleetNotFound(vehicle.getId(), fleet.getId());
        }

        return vehicle;
    }
}
