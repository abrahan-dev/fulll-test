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
import { GeoLocation } from "../../../src/shared/Domain/ValueObject/GeoLocation.ts";
import {ParkVehicleCommand} from "../../../src/Vehicle/App/Park/ParkVehicleCommand.ts";
import {ParkingValet} from "../../../src/Vehicle/App/Park/ParkingValet.ts";
import {ParkVehicleCommandHandler} from "../../../src/Vehicle/App/Park/ParkVehicleCommandHandler.ts";
import {FindVehicleQuery} from "../../../src/Vehicle/App/Find/FindVehicleQuery.ts";
import {FindVehicleQueryHandler} from "../../../src/Vehicle/App/Find/FindVehicleQueryHandler.ts";
import {VehicleAlreadyParkedAtLocation} from "../../../src/Vehicle/Domain/VehicleAlreadyParkedAtLocation.ts";
import {CreateUserCommand} from "../../../src/User/App/Create/CreateUserCommand.ts";
import {UserCreator} from "../../../src/User/App/Create/UserCreator.ts";
import {InFileUserRepository} from "../../../src/User/Infra/InFileUserRepository.ts";
import {CreateUserCommandHandler} from "../../../src/User/App/Create/CreateUserCommandHandler.ts";
import {FindFleetQuery} from "../../../src/Fleet/App/Find/FindFleetQuery.ts";
import {FindFleetQueryHandler} from "../../../src/Fleet/App/Find/FindFleetQueryHandler.ts";
import type {UserRepository} from "../../../src/User/Domain/UserRepository.ts";
import type {FleetRepository} from "../../../src/Fleet/Domain/FleetRepository.ts";
import type {VehicleRepository} from "../../../src/Vehicle/Domain/VehicleRepository.ts";
import {PostgresUserRepository} from "../../../src/User/Infra/PostgresUserRepository.ts";
import {PostgresFleetRepository} from "../../../src/Fleet/Infra/PostgresFleetRepository.ts";
import {PostgresVehicleRepository} from "../../../src/Vehicle/Infra/PostgresVehicleRepository.ts";

export class FleetTestContext {
    private readonly userRepository: UserRepository;
    private readonly fleetRepository: FleetRepository;
    private readonly vehicleRepository: VehicleRepository;

    constructor(
        public useDatabase: boolean,
        public fleetId: string | null = null,
        public userId: string | null = null,
        public plateNumber: string | null = null,
        public vehicleAlreadyRegistered: boolean = false,
        public vehicleAlreadyParkedAtLocation: boolean = false,
        public otherUserFleetId: string | null = null,
        public location: GeoLocation | null = null,
    ) {
        if (useDatabase) {
            this.userRepository = new PostgresUserRepository();
            this.fleetRepository = new PostgresFleetRepository();
            this.vehicleRepository = new PostgresVehicleRepository();
        } else {
            this.userRepository = new InFileUserRepository();
            this.fleetRepository = new InFileFleetRepository();
            this.vehicleRepository = new InFileVehicleRepository();
        }
    }

    async createFleet(fleetName: string): Promise<void> {
        const userId = await this.createUser();
        const fleetId = crypto.randomUUID();
        const createFleetCommand = new CreateFleetCommand(fleetId, fleetName, userId);
        const fleetCreator = new FleetCreator(this.fleetRepository, new InFileEventBus());
        const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
        await createFleetHandler.handle(createFleetCommand);
        this.fleetId = fleetId;
        this.userId = userId;
    }

    async createVehicle(plateNumber: string): Promise<void> {
        const vehicleId = crypto.randomUUID();
        await this.handleVehicleCreation(vehicleId, plateNumber);
        this.plateNumber = plateNumber;
    }

    async registerVehicleToFleet(): Promise<void> {
        if (!this.plateNumber || !this.fleetId) {
            throw new Error("Vehicle or Fleet is missing from context");
        }

        try {
            const registerVehicleToFleetCommand = new RegisterVehicleToFleetCommand(this.fleetId, this.plateNumber);
            const fleetVehicleRegisterer = new FleetVehicleRegisterer(this.fleetRepository, new InFileEventBus());
            const vehicleFinder = new VehicleFinder(this.vehicleRepository);
            const registerVehicleToFleetCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetVehicleRegisterer, vehicleFinder);
            await registerVehicleToFleetCommandHandler.handle(registerVehicleToFleetCommand);
        } catch (error: unknown) {
            if (error instanceof VehicleAlreadyRegisteredInFleet) {
                this.vehicleAlreadyRegistered = true;
                return;
            }
            throw error;
        }
    }

    async isVehicleInFleet(): Promise<boolean> {
        if (!this.plateNumber || !this.fleetId) {
            throw new Error("Vehicle or Fleet is missing from context");
        }
        const findVehicleInFleetQuery = new FindVehicleInFleetQuery(this.plateNumber, this.fleetId);
        const vehicleFinder = new VehicleFinder(this.vehicleRepository);
        const fleetFinder = new FleetFinder(this.fleetRepository);
        const findVehicleInFleetQueryHandler = new FindVehicleInFleetQueryHandler(vehicleFinder, fleetFinder);
        try {
            await findVehicleInFleetQueryHandler.handle(findVehicleInFleetQuery);
            return true;
        } catch (error) {
            return false;
        }
    }

    async createOtherUserFleet(): Promise<void> {
        const fleetId = crypto.randomUUID();
        const userId = await this.createUser();
        const createFleetCommand = new CreateFleetCommand(fleetId, "My other user fleet", userId);
        const fleetCreator = new FleetCreator(this.fleetRepository, new InFileEventBus());
        const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
        await createFleetHandler.handle(createFleetCommand);
        this.otherUserFleetId = fleetId;
    }

    async registerVehicleToOtherFleet(): Promise<void> {
        if (!this.otherUserFleetId || !this.plateNumber) {
            throw new Error("Other user fleet or vehicle is missing from context");
        }

        const registerVehicleToFleetCommand = new RegisterVehicleToFleetCommand(this.otherUserFleetId, this.plateNumber);
        const fleetVehicleRegisterer = new FleetVehicleRegisterer(this.fleetRepository, new InFileEventBus());
        const vehicleFinder = new VehicleFinder(this.vehicleRepository);
        const registerVehicleToFleetCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetVehicleRegisterer, vehicleFinder);
        await registerVehicleToFleetCommandHandler.handle(registerVehicleToFleetCommand);
    }

    get isCurrentVehicleAlreadyRegisteredInFleet(): boolean {
        return this.vehicleAlreadyRegistered;
    }

    get isCurrentVehicleAlreadyParkedAtCurrentLocation(): boolean {
        return this.vehicleAlreadyParkedAtLocation;
    }

    private async handleVehicleCreation(vehicleId: string, vehiclePlateNumber: string): Promise<void> {
        const createVehicleCommand = new CreateVehicleCommand(vehicleId, vehiclePlateNumber);
        const vehicleCreator = new VehicleCreator(this.vehicleRepository, new InFileEventBus());
        const createVehicleCommandHandler = new CreateVehicleCommandHandler(vehicleCreator);
        await createVehicleCommandHandler.handle(createVehicleCommand);
    }

    createLocation(): GeoLocation {
        this.location = GeoLocation.random();

        return this.location;
    }

    async parkVehicleAtLocation() {
        if (!this.plateNumber || !this.location || !this.fleetId) {
            throw new Error("Vehicle or location is missing from context");
        }

        const findFleetQuery = new FindFleetQuery(this.fleetId);
        const fleetFinder = new FleetFinder(this.fleetRepository);
        const findFleetQueryHandler = new FindFleetQueryHandler(fleetFinder);
        await findFleetQueryHandler.handle(findFleetQuery);

        const parkVehicleCommand = new ParkVehicleCommand(this.plateNumber, this.location.getLatitude(), this.location.getLongitude(), this.location.getAltitude());
        const parkVehicleCommandHandler = new ParkVehicleCommandHandler(new ParkingValet(this.vehicleRepository, new InFileEventBus()));

        try {
            await parkVehicleCommandHandler.handle(parkVehicleCommand);
        } catch (error: unknown) {
            if (error instanceof VehicleAlreadyParkedAtLocation) {
                this.vehicleAlreadyParkedAtLocation = true;
                return;
            }
            throw error;
        }
    }

    async isVehicleParkedAtLocation(): Promise<boolean> {
        if (!this.plateNumber || !this.location) {
            throw new Error("Vehicle or location is missing from context");
        }

        const findVehicleQuery = new FindVehicleQuery(this.plateNumber);
        const vehicleFinder = new VehicleFinder(this.vehicleRepository);
        const findVehicleQueryHandler = new FindVehicleQueryHandler(vehicleFinder);
        const vehicle = await findVehicleQueryHandler.find(findVehicleQuery);

        return vehicle.isAtLocation(this.location);
    }

    private async createUser() {
        const userId = crypto.randomUUID();
        const userName = "Fulll";
        const createUserCommand = new CreateUserCommand(userId, userName);
        const userCreator = new UserCreator(this.userRepository, new InFileEventBus());
        const createUserCommandHandler = new CreateUserCommandHandler(userCreator);
        await createUserCommandHandler.handle(createUserCommand);

        return userId;
    }
}
