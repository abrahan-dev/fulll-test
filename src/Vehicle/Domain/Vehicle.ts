import {AggregateRoot} from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import type {VehicleId} from "./ValueObject/VehicleId.ts";
import type {VehicleName} from "./ValueObject/VehicleName.ts";
import {VehicleCreatedDomainEvent} from "./VehicleCreatedDomainEvent.ts";

export class Vehicle extends AggregateRoot {
    constructor(
        private readonly id: VehicleId,
        private name: VehicleName,
    ) {
        super();
    }

    static create(id: VehicleId, name: VehicleName): Vehicle {
        const vehicle = new Vehicle(id, name);

        vehicle.record(new VehicleCreatedDomainEvent(id.getValue(), name.getValue()));

        return vehicle;
    }

    getId(): VehicleId {
        return this.id;
    }

    getName(): VehicleName {
        return this.name;
    }

    rename(newName: VehicleName): void {
        this.name = newName;
    }
}