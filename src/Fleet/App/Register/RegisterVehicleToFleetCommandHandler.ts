import type { CommandHandler } from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type { FleetVehicleRegisterer } from "./FleetVehicleRegisterer.ts";
import type { RegisterVehicleToFleetCommand } from "./RegisterVehicleToFleetCommand.ts";
import { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import type { VehicleFinder } from "../../../Vehicle/App/Find/VehicleFinder.ts";
import { VehiclePlateNumber } from "../../../Vehicle/Domain/ValueObject/VehiclePlateNumber.ts";

export class RegisterVehicleToFleetCommandHandler implements CommandHandler {
  constructor(
    private readonly registerer: FleetVehicleRegisterer,
    private readonly vehicleFinder: VehicleFinder,
  ) {}

  async handle(command: RegisterVehicleToFleetCommand): Promise<void> {
    const fleetId = new FleetId(command.getFleetId());
    const plateNumber = new VehiclePlateNumber(command.getPlateNumber());
    const vehicle = await this.vehicleFinder.find(plateNumber);
    await this.registerer.register(fleetId, vehicle.getId());
  }
}
