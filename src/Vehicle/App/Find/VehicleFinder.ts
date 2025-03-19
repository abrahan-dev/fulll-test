import type {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import type {Vehicle} from "../../Domain/Vehicle.ts";
import type {VehicleRepository} from "../../Domain/VehicleRepository.ts";
import {VehicleNotFound} from "../../Domain/VehicleNotFound.ts";
import type {VehiclePlateNumber} from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class VehicleFinder {
    constructor(private readonly repository: VehicleRepository) {}

    public find(plateNumber: VehiclePlateNumber): Vehicle {
        const vehicle = this.repository.search(plateNumber);

        if (!vehicle) {
            throw new VehicleNotFound(plateNumber);
        }

        return vehicle;
    }
}
