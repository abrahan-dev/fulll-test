import type {CommandHandler} from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type {FleetVehicleRegisterer} from "./FleetVehicleRegisterer.ts";
import type {RegisterVehicleToFleetCommand} from "./RegisterVehicleToFleetCommand.ts";
import {FleetId} from "../../Domain/ValueObject/FleetId.ts";
import {VehicleId} from "../../../Vehicle/Domain/ValueObject/VehicleId.ts";
import type {VehicleFinder} from "../../../Vehicle/App/Find/VehicleFinder.ts";

export class RegisterVehicleToFleetCommandHandler implements CommandHandler {
    constructor(private readonly registerer: FleetVehicleRegisterer, private readonly vehicleFinder: VehicleFinder) {}

    async handle(command: RegisterVehicleToFleetCommand): Promise<void> {
        const fleetId = new FleetId(command.getFleetId());
        const vehicleId = new VehicleId(command.getVehicleId());
        await this.ensureVehicleExists(vehicleId);
        this.registerer.register(fleetId, vehicleId);
    }

    async ensureVehicleExists(vehicleId: VehicleId): Promise<void> {
        await this.vehicleFinder.find(vehicleId);
    }
}
