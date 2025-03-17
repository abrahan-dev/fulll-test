import type {CommandHandler} from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type {CreateFleetCommand} from "./CreateFleetCommand.ts";
import type {FleetCreator} from "./FleetCreator.ts";
import {FleetId} from "../../Domain/ValueObject/FleetId.ts";
import {FleetName} from "../../Domain/ValueObject/FleetName.ts";

export class CreateFleetCommandHandler implements CommandHandler {
    constructor(private readonly creator: FleetCreator) {}

    handle(command: CreateFleetCommand): void {
        const id = new FleetId(command.getId());
        const name = new FleetName(command.getName());

        this.creator.run(id, name);
    }
}
