import type {CommandHandler} from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type {CreateVehicleCommand} from "./CreateVehicleCommand.ts";
import type {VehicleCreator} from "./VehicleCreator.ts";
import {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import {VehicleName} from "../../Domain/ValueObject/VehicleName.ts";

export class CreateVehicleCommandHandler implements CommandHandler {
    constructor(private readonly creator: VehicleCreator) {}

    handle(command: CreateVehicleCommand): void {
        const id = new VehicleId(command.getId());
        const name = new VehicleName(command.getName());

        this.creator.run(id, name);
    }
}
