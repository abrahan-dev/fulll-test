import {AggregateRoot} from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import {VehicleId} from "./ValueObject/VehicleId.ts";
import {VehicleName} from "./ValueObject/VehicleName.ts";
import {VehicleCreatedDomainEvent} from "./VehicleCreatedDomainEvent.ts";
import {GeoLocation} from "../../shared/Domain/ValueObject/GeoLocation.ts";
import {VehicleParkedDomainEvent} from "./VehicleParkedDomainEvent.ts";
import {VehicleAlreadyParkedAtLocation} from "./VehicleAlreadyParkedAtLocation.ts";

export class Vehicle extends AggregateRoot {
    constructor(
        private readonly id: VehicleId,
        private name: VehicleName,
        private location?: GeoLocation
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

    park(location: GeoLocation) {
        if (this.isAtLocation(location) && this.location) {
            throw new VehicleAlreadyParkedAtLocation(this.id, this.location);
        }
        this.location = location;
        this.record(new VehicleParkedDomainEvent(this.id.getValue(), location.getLatitude(), this.location.getLongitude()));
    }

    static fromPrimitives(data: {id: string, name: string, longitude?: number, latitude?: number}): Vehicle {
        if (!data.longitude || !data.latitude) {
            return new Vehicle(new VehicleId(data.id), new VehicleName(data.name));
        }

        const location = new GeoLocation(data.longitude, data.latitude)

        return new Vehicle(new VehicleId(data.id), new VehicleName(data.name), location);
    }

    isAtLocation(location: GeoLocation) {
        return this.location ? this.location.equals(location) : false;
    }
}
