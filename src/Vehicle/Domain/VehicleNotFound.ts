import type { VehiclePlateNumber } from "./ValueObject/VehiclePlateNumber.ts";

export class VehicleNotFound extends Error {
  constructor(plateNumber: VehiclePlateNumber) {
    super(`Vehicle with plate number ${plateNumber.getValue()} not found`);
  }
}
