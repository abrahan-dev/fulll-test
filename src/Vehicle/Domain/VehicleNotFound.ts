import type {VehicleId} from "./ValueObject/VehicleId.ts";

export class VehicleNotFound extends Error {
    constructor(vehicleId: VehicleId) {
        super(`Vehicle with id ${vehicleId.getValue()} not found`);
    }
}
