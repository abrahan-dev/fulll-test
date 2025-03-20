import type { CommandHandler } from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type { CreateVehicleCommand } from "./CreateVehicleCommand.ts";
import type { VehicleCreator } from "./VehicleCreator.ts";
import { VehicleId } from "../../Domain/ValueObject/VehicleId.ts";
import { VehiclePlateNumber } from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class CreateVehicleCommandHandler implements CommandHandler {
  constructor(private readonly creator: VehicleCreator) {}

  async handle(command: CreateVehicleCommand): Promise<void> {
    const id = new VehicleId(command.getId());
    const vehiclePlateNumber = new VehiclePlateNumber(command.getPlateNumber());

    await this.creator.create(id, vehiclePlateNumber);
  }
}
