import type { EventBus } from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type { VehicleRepository } from "../../Domain/VehicleRepository.ts";
import type { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";
import type { GeoLocation } from "../../../shared/Domain/ValueObject/GeoLocation.ts";
import { VehicleNotFound } from "../../Domain/VehicleNotFound.ts";

export class ParkingValet {
  constructor(
    private readonly repository: VehicleRepository,
    private readonly bus: EventBus,
  ) {}

  async park(
    plateNumber: VehiclePlateNumber,
    location: GeoLocation,
  ): Promise<void> {
    const vehicle = await this.repository.search(plateNumber);

    if (!vehicle) {
      throw new VehicleNotFound(plateNumber);
    }

    vehicle.park(location);
    await this.repository.save(vehicle);
    this.bus.publish(vehicle.pullDomainEvents());
  }
}
