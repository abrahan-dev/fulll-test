import { AggregateRoot } from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import { VehicleId } from "./ValueObject/VehicleId.ts";
import { VehiclePlateNumber } from "./ValueObject/VehiclePlateNumber.ts";
import { VehicleCreatedDomainEvent } from "./VehicleCreatedDomainEvent.ts";
import { GeoLocation } from "../../shared/Domain/ValueObject/GeoLocation.ts";
import { VehicleParkedDomainEvent } from "./VehicleParkedDomainEvent.ts";
import { VehicleAlreadyParkedAtLocation } from "./VehicleAlreadyParkedAtLocation.ts";

export class Vehicle extends AggregateRoot {
  constructor(
    private readonly id: VehicleId,
    private plateNumber: VehiclePlateNumber,
    private location?: GeoLocation,
  ) {
    super();
  }

  static create(id: VehicleId, plateNumber: VehiclePlateNumber): Vehicle {
    const vehicle = new Vehicle(id, plateNumber);

    vehicle.record(
      new VehicleCreatedDomainEvent(id.getValue(), plateNumber.getValue()),
    );

    return vehicle;
  }

  getId(): VehicleId {
    return this.id;
  }

  getPlateNumber(): VehiclePlateNumber {
    return this.plateNumber;
  }

  park(location: GeoLocation) {
    if (this.isAtLocation(location) && this.location) {
      throw new VehicleAlreadyParkedAtLocation(this.id, this.location);
    }

    this.location = location;
    this.record(
      new VehicleParkedDomainEvent(
        this.id.getValue(),
        location.getLatitude(),
        this.location.getLongitude(),
        this.location.getAltitude(),
      ),
    );
  }

  static fromPrimitives(data: {
    id: string;
    plateNumber: string;
    longitude?: number;
    latitude?: number;
    altitude?: number;
  }): Vehicle {
    if (!data.longitude || !data.latitude) {
      return new Vehicle(
        new VehicleId(data.id),
        new VehiclePlateNumber(data.plateNumber),
      );
    }

    const location = new GeoLocation(
      data.longitude,
      data.latitude,
      data.altitude,
    );

    return new Vehicle(
      new VehicleId(data.id),
      new VehiclePlateNumber(data.plateNumber),
      location,
    );
  }

  isAtLocation(location: GeoLocation) {
    return this.location ? this.location.equals(location) : false;
  }

  getLocation() {
    return this.location;
  }
}
