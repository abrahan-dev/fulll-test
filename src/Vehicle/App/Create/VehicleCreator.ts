import type {EventBus} from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type {VehicleRepository} from "../../Domain/VehicleRepository.ts";
import type {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import type {VehicleName} from "../../Domain/ValueObject/VehicleName.ts";
import {Vehicle} from "../../Domain/Vehicle.ts";

export class VehicleCreator {
    constructor(
        private readonly repository: VehicleRepository,
        private readonly bus: EventBus
    ) {}

    run(id: VehicleId, name: VehicleName): void {
        const vehicle = Vehicle.create(id, name);

        this.repository.save(vehicle);
        this.bus.publish(vehicle.pullDomainEvents());
    }
}
