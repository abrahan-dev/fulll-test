import { AggregateRoot } from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import { FleetCreatedDomainEvent } from "./FleetCreatedDomainEvent.ts";
import { VehicleRegisteredInFleetDomainEvent } from "./VehicleRegisteredInFleetDomainEvent.ts";
import { FleetId } from "./ValueObject/FleetId.ts";
import { FleetName } from "./ValueObject/FleetName.ts";
import { VehicleId } from "../../Vehicle/Domain/ValueObject/VehicleId.ts";
import { VehicleAlreadyRegisteredInFleet } from "./VehicleAlreadyRegisteredInFleet.ts";
import { UserId } from "../../User/Domain/ValueObject/UserId.ts";

export class Fleet extends AggregateRoot {
  constructor(
    private readonly id: FleetId,
    private readonly name: FleetName,
    private vehicles: VehicleId[] = [],
    private readonly userId: UserId,
  ) {
    super();
  }

  static create(id: FleetId, name: FleetName, userId: UserId): Fleet {
    const fleet = new Fleet(id, name, [], userId);

    fleet.record(
      new FleetCreatedDomainEvent(
        id.getValue(),
        name.getValue(),
        userId.getValue(),
      ),
    );

    return fleet;
  }

  getId(): FleetId {
    return this.id;
  }

  getName(): FleetName {
    return this.name;
  }

  getUserId(): UserId {
    return this.userId;
  }

  getVehicles(): VehicleId[] {
    return this.vehicles;
  }

  hasVehicle(vehicleId: VehicleId): boolean {
    return this.vehicles.some((id) => id.equals(vehicleId));
  }

  registerVehicle(vehicleId: VehicleId) {
    if (this.hasVehicle(vehicleId)) {
      throw new VehicleAlreadyRegisteredInFleet(
        vehicleId.getValue(),
        this.id.getValue(),
      );
    }

    this.vehicles.push(vehicleId);
    this.record(
      new VehicleRegisteredInFleetDomainEvent(
        vehicleId.getValue(),
        this.id.getValue(),
      ),
    );
  }

  static fromPrimitives(primitives: {
    id: string;
    name: string;
    vehicles: string[];
    userId: string;
  }): Fleet {
    return new Fleet(
      new FleetId(primitives.id),
      new FleetName(primitives.name),
      primitives.vehicles.map((vehicleId) => new VehicleId(vehicleId)),
      new UserId(primitives.userId),
    );
  }
}
