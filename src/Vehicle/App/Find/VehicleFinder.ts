import type { Vehicle } from "../../Domain/Vehicle.ts";
import type { VehicleRepository } from "../../Domain/VehicleRepository.ts";
import { VehicleNotFound } from "../../Domain/VehicleNotFound.ts";
import type { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class VehicleFinder {
  constructor(private readonly repository: VehicleRepository) {}

  async find(plateNumber: VehiclePlateNumber): Promise<Vehicle> {
    const vehicle = await this.repository.search(plateNumber);

    if (!vehicle) {
      throw new VehicleNotFound(plateNumber);
    }

    return vehicle;
  }
}
