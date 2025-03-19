import {AggregateRoot} from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import {FleetCreatedDomainEvent} from "./FleetCreatedDomainEvent.ts";
import {VehicleRegisteredInFleetDomainEvent} from "./VehicleRegisteredInFleetDomainEvent.ts";
import {FleetId} from "./ValueObject/FleetId.ts";
import {FleetName} from "./ValueObject/FleetName.ts";
import {VehicleId} from "../../Vehicle/Domain/ValueObject/VehicleId.ts";
import {VehicleAlreadyRegisteredInFleet} from "./VehicleAlreadyRegisteredInFleet.ts";

export class Fleet extends AggregateRoot {
    constructor(
        private readonly id: FleetId,
        private name: FleetName,
        private vehicles: VehicleId[] = []
    ) {
        super();
    }

    static create(id: FleetId, name: FleetName): Fleet {
        const fleet = new Fleet(id, name, []);

        fleet.record(new FleetCreatedDomainEvent(id.getValue(), name.getValue()));

        return fleet;
    }

    getId(): FleetId {
        return this.id;
    }

    getName(): FleetName {
        return this.name;
    }

    rename(newName: FleetName): void {
        this.name = newName;
    }

    hasVehicle(vehicleId: VehicleId): boolean {
        return this.vehicles.some((id) => id.equals(vehicleId));
    }

    registerVehicle(vehicleId: VehicleId) {
        if (this.hasVehicle(vehicleId)) {
            throw new VehicleAlreadyRegisteredInFleet(vehicleId.getValue(), this.id.getValue());
        }

        this.vehicles.push(vehicleId);
        this.record(new VehicleRegisteredInFleetDomainEvent(vehicleId.getValue(), this.id.getValue()));
    }

    static fromPrimitives(primitives: {id: string, name: string, vehicles: string[]}): Fleet {
        return new Fleet(
            new FleetId(primitives.id),
            new FleetName(primitives.name),
            primitives.vehicles.map((vehicleId) => new VehicleId(vehicleId))
        );
    }
}
