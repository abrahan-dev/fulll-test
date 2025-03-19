import type {EventBus} from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type {VehicleRepository} from "../../Domain/VehicleRepository.ts";
import type {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import type {VehiclePlateNumber} from "../../Domain/ValueObject/VehiclePlateNumber.ts";
import {Vehicle} from "../../Domain/Vehicle.ts";
import type {GeoLocation} from "../../../shared/Domain/ValueObject/GeoLocation.ts";
import {VehicleNotFound} from "../../Domain/VehicleNotFound.ts";

export class ParkingValet {
    constructor(
        private readonly repository: VehicleRepository,
        private readonly bus: EventBus
    ) {}

    park(plateNumber: VehiclePlateNumber, location: GeoLocation): void {
        const vehicle = this.repository.search(plateNumber);

        if (!vehicle) {
            throw new VehicleNotFound(plateNumber);
        }

        vehicle.park(location);
        this.repository.save(vehicle);
        this.bus.publish(vehicle.pullDomainEvents());
    }
}
