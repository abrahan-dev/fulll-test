import type {CommandHandler} from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type {ParkingValet} from "./ParkingValet.ts";
import type {ParkVehicleCommand} from "./ParkVehicleCommand.ts";
import {VehicleId} from "../../Domain/ValueObject/VehicleId.ts";
import {GeoLocation} from "../../../shared/Domain/ValueObject/GeoLocation.ts";

export class ParkVehicleCommandHandler implements CommandHandler {
    constructor(private readonly parkingValet: ParkingValet) {}

    handle(command: ParkVehicleCommand): void {
        const id = new VehicleId(command.getId());
        const location = new GeoLocation(command.getLongitude(), command.getLatitude());

        this.parkingValet.park(id, location);
    }
}
