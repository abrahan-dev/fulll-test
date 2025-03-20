import type { EventBus } from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type { VehicleRepository } from "../../Domain/VehicleRepository.ts";
import type { VehicleId } from "../../Domain/ValueObject/VehicleId.ts";
import type { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";
import { Vehicle } from "../../Domain/Vehicle.ts";
import { VehicleAlreadyExists } from "../../Domain/VehicleAlreadyExists.ts";

export class VehicleCreator {
  constructor(
    private readonly repository: VehicleRepository,
    private readonly bus: EventBus,
  ) {}

  async create(id: VehicleId, plateNumber: VehiclePlateNumber): Promise<void> {
    const existingVehicle = await this.repository.search(plateNumber);

    if (existingVehicle) {
      throw new VehicleAlreadyExists(id, plateNumber);
    }

    const vehicle = Vehicle.create(id, plateNumber);

    await this.repository.save(vehicle);
    this.bus.publish(vehicle.pullDomainEvents());
  }
}
