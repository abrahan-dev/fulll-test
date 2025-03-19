import type {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import type {Vehicle} from "../../Domain/Vehicle.ts";
import type {VehicleRepository} from "../../Domain/VehicleRepository.ts";
import {VehicleNotFound} from "../../Domain/VehicleNotFound.ts";

export class VehicleFinder {
    constructor(private readonly repository: VehicleRepository) {}

    public find(id: VehicleId): Vehicle {
        const vehicle = this.repository.search(id);

        if (!vehicle) {
            throw new VehicleNotFound(id);
        }

        return vehicle;
    }
}
