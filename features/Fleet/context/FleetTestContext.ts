import {FleetCreator} from "../../../src/Fleet/App/Create/FleetCreator.ts";
import {CreateFleetCommand} from "../../../src/Fleet/App/Create/CreateFleetCommand.ts";
import {InFileFleetRepository} from "../../../src/Fleet/Infra/InFileFleetRepository.ts";
import {InFileEventBus} from "../../../src/shared/Infra/Bus/Event/InFileEventBus.ts";
import {CreateFleetCommandHandler} from "../../../src/Fleet/App/Create/CreateFleetCommandHandler.ts";
import {CreateVehicleCommand} from "../../../src/Vehicle/App/Create/CreateVehicleCommand.ts";
import {VehicleCreator} from "../../../src/Vehicle/App/Create/VehicleCreator.ts";
import {InFileVehicleRepository} from "../../../src/Vehicle/Infra/InFileVehicleRepository.ts";
import {CreateVehicleCommandHandler} from "../../../src/Vehicle/App/Create/CreateVehicleCommandHandler.ts";
import {RegisterVehicleToFleetCommand} from "../../../src/Fleet/App/Register/RegisterVehicleToFleetCommand.ts";
import {FleetVehicleRegisterer} from "../../../src/Fleet/App/Register/FleetVehicleRegisterer.ts";
import {
    RegisterVehicleToFleetCommandHandler
} from "../../../src/Fleet/App/Register/RegisterVehicleToFleetCommandHandler.ts";
import {VehicleFinder} from "../../../src/Vehicle/App/Find/VehicleFinder.ts";
import {FindVehicleInFleetQuery} from "../../../src/Fleet/App/Find/FindVehicleInFleetQuery.ts";
import {FindVehicleInFleetQueryHandler} from "../../../src/Fleet/App/Find/FindVehicleInFleetQueryHandler.ts";
import {FleetFinder} from "../../../src/Fleet/App/Find/FleetFinder.ts";
import {VehicleAlreadyRegisteredInFleet} from "../../../src/Fleet/Domain/VehicleAlreadyRegisteredInFleet.ts";

export class FleetTestContext {
    constructor(
        public fleetId: string | null = null,
        public vehicleId: string | null = null,
        public vehicleIdAlreadyRegistered: boolean = false,
        public otherUserFleetId: string | null = null,
    ) {}

    createFleet(fleetName: string): void {
        const fleetId = crypto.randomUUID();
        const createFleetCommand = new CreateFleetCommand(fleetId, "My fleet");
        const fleetCreator = new FleetCreator(new InFileFleetRepository(), new InFileEventBus());
        const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
        createFleetHandler.handle(createFleetCommand);
        this.fleetId = fleetId;
    }

    createVehicle(vehicleName: string): void {
        const vehicleId = crypto.randomUUID();
        this.handleVehicleCreation(vehicleId, "My vehicle");
        this.vehicleId = vehicleId;
    }

    async registerVehicleToFleet(): Promise<void> {
        if (!this.vehicleId || !this.fleetId) {
            throw new Error("Vehicle or Fleet is missing from context");
        }

        try {
            const registerVehicleToFleetCommand = new RegisterVehicleToFleetCommand(this.fleetId, this.vehicleId);
            const fleetVehicleRegisterer = new FleetVehicleRegisterer(new InFileFleetRepository(), new InFileEventBus());
            const vehicleFinder = new VehicleFinder(new InFileVehicleRepository());
            const registerVehicleToFleetCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetVehicleRegisterer, vehicleFinder);
            await registerVehicleToFleetCommandHandler.handle(registerVehicleToFleetCommand);
        } catch (error: unknown) {
            if (error instanceof VehicleAlreadyRegisteredInFleet) {
                this.vehicleIdAlreadyRegistered = true;
            }
        }
    }

    async isVehicleInFleet(): Promise<boolean> {
        if (!this.vehicleId || !this.fleetId) {
            throw new Error("Vehicle or Fleet is missing from context");
        }
        const findVehicleInFleetQuery = new FindVehicleInFleetQuery(this.vehicleId, this.fleetId);
        const vehicleFinder = new VehicleFinder(new InFileVehicleRepository());
        const fleetFinder = new FleetFinder(new InFileFleetRepository());
        const findVehicleInFleetQueryHandler = new FindVehicleInFleetQueryHandler(vehicleFinder, fleetFinder);
        try {
            await findVehicleInFleetQueryHandler.handle(findVehicleInFleetQuery);
            return true;
        } catch (error) {
            return false;
        }
    }

    createOtherUserFleet(): void {
        const fleetId = crypto.randomUUID();
        const createFleetCommand = new CreateFleetCommand(fleetId, "My other user fleet");
        const fleetCreator = new FleetCreator(new InFileFleetRepository(), new InFileEventBus());
        const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
        createFleetHandler.handle(createFleetCommand);
        this.otherUserFleetId = fleetId;
    }

    async registerVehicleToOtherFleet(): Promise<void> {
        if (!this.otherUserFleetId || !this.vehicleId) {
            throw new Error("Other user fleet or vehicle is missing from context");
        }

        const registerVehicleToFleetCommand = new RegisterVehicleToFleetCommand(this.otherUserFleetId, this.vehicleId);
        const fleetVehicleRegisterer = new FleetVehicleRegisterer(new InFileFleetRepository(), new InFileEventBus());
        const vehicleFinder = new VehicleFinder(new InFileVehicleRepository());
        const registerVehicleToFleetCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetVehicleRegisterer, vehicleFinder);
        await registerVehicleToFleetCommandHandler.handle(registerVehicleToFleetCommand);
    }

    get isCurrentVehicleAlreadyRegisteredInFleet(): boolean {
        return this.vehicleIdAlreadyRegistered;
    }

    private handleVehicleCreation(vehicleId: string, vehicleName: string): void {
        const createVehicleCommand = new CreateVehicleCommand(vehicleId, vehicleName);
        const vehicleCreator = new VehicleCreator(new InFileVehicleRepository(), new InFileEventBus());
        const createVehicleCommandHandler = new CreateVehicleCommandHandler(vehicleCreator);
        createVehicleCommandHandler.handle(createVehicleCommand);
    }
}
