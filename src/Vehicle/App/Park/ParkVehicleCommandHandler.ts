import type { CommandHandler } from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type { ParkingValet } from "./ParkingValet.ts";
import type { ParkVehicleCommand } from "./ParkVehicleCommand.ts";
import { GeoLocation } from "../../../shared/Domain/ValueObject/GeoLocation.ts";
import { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class ParkVehicleCommandHandler implements CommandHandler {
  constructor(private readonly parkingValet: ParkingValet) {}

  async handle(command: ParkVehicleCommand): Promise<void> {
    const plateNumber = new VehiclePlateNumber(command.getPlateNumber());
    const location = new GeoLocation(
      command.getLongitude(),
      command.getLatitude(),
      command.getAltitude(),
    );

    await this.parkingValet.park(plateNumber, location);
  }
}
