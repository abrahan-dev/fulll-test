import type { Vehicle } from "./Vehicle.ts";
import type { VehiclePlateNumber } from "./ValueObject/VehiclePlateNumber.ts";

export interface VehicleRepository {
  save(vehicle: Vehicle): Promise<void>;
  search(plateNumber: VehiclePlateNumber): Promise<Vehicle | null>;
}
