import type {Query} from "../../../shared/Domain/Bus/Query/Query.ts";

export class FindVehicleQuery implements Query {
    constructor(private readonly vehicleId: string) {}

    getVehicleId(): string {
        return this.vehicleId;
    }
}
