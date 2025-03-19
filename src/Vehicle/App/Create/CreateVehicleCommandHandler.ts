import type {CommandHandler} from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type {CreateVehicleCommand} from "./CreateVehicleCommand.ts";
import type {VehicleCreator} from "./VehicleCreator.ts";
import {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import {VehiclePlateNumber} from "../../Domain/ValueObject/VehiclePlateNumber.ts";

export class CreateVehicleCommandHandler implements CommandHandler {
    constructor(private readonly creator: VehicleCreator) {}

    handle(command: CreateVehicleCommand): void {
        const id = new VehicleId(command.getId());
        const vehiclePlateNumber = new VehiclePlateNumber(command.getPlateNumber());

        this.creator.create(id, vehiclePlateNumber);
    }
}
