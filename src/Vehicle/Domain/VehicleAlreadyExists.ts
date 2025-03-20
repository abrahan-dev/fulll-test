import type { VehicleId } from "./ValueObject/VehicleId.ts";
import type { VehiclePlateNumber } from "./ValueObject/VehiclePlateNumber.ts";

export class VehicleAlreadyExists extends Error {
  constructor(id: VehicleId, plateNumber: VehiclePlateNumber) {
    super(
      `Vehicle with id ${id.getValue()} and plate number ${plateNumber.getValue()} already exists`,
    );
  }
}
