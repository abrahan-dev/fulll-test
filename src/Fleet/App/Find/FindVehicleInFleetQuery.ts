import type {Query} from "../../../shared/Domain/Bus/Query/Query.ts";

export class FindVehicleInFleetQuery implements Query {
    constructor(private readonly vehicleId: string, private readonly fleetId: string) {}

    getVehicleId(): string {
        return this.vehicleId;
    }

    getFleetId(): string {
        return this.fleetId;
    }
}
