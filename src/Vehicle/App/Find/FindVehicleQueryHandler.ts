import type {QueryHandler} from "../../../shared/Domain/Bus/Query/QueryHandler.ts";
import type {VehicleFinder} from "./VehicleFinder.ts";
import type {FindVehicleQuery} from "./FindVehicleQuery.ts";
import type {Vehicle} from "../../Domain/Vehicle.ts";
import {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";

export class FindVehicleQueryHandler implements QueryHandler {
    constructor(private readonly finder: VehicleFinder) {}

    find(query: FindVehicleQuery): Vehicle {
        return this.finder.find(new VehicleId(query.getVehicleId()));
    }
}
