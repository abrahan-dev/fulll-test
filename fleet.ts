import { Command } from 'commander';
import {CreateFleetCommand} from "./src/Fleet/App/Create/CreateFleetCommand.ts";
import {FleetCreator} from "./src/Fleet/App/Create/FleetCreator.ts";
import {InFileEventBus} from "./src/shared/Infra/Bus/Event/InFileEventBus.ts";
import {CreateFleetCommandHandler} from "./src/Fleet/App/Create/CreateFleetCommandHandler.ts";
import {CreateUserCommand} from "./src/User/App/Create/CreateUserCommand.ts";
import {UserCreator} from "./src/User/App/Create/UserCreator.ts";
import {CreateUserCommandHandler} from "./src/User/App/Create/CreateUserCommandHandler.ts";
import {UserAlreadyExists} from "./src/User/Domain/UserAlreadyExists.ts";
import {RegisterVehicleToFleetCommand} from "./src/Fleet/App/Register/RegisterVehicleToFleetCommand.ts";
import {FleetVehicleRegisterer} from "./src/Fleet/App/Register/FleetVehicleRegisterer.ts";
import {RegisterVehicleToFleetCommandHandler} from "./src/Fleet/App/Register/RegisterVehicleToFleetCommandHandler.ts";
import {VehicleFinder} from "./src/Vehicle/App/Find/VehicleFinder.ts";
import {CreateVehicleCommand} from "./src/Vehicle/App/Create/CreateVehicleCommand.ts";
import {VehicleCreator} from "./src/Vehicle/App/Create/VehicleCreator.ts";
import {CreateVehicleCommandHandler} from "./src/Vehicle/App/Create/CreateVehicleCommandHandler.ts";
import {VehicleAlreadyExists} from "./src/Vehicle/Domain/VehicleAlreadyExists.ts";
import {ParkVehicleCommand} from "./src/Vehicle/App/Park/ParkVehicleCommand.ts";
import {ParkVehicleCommandHandler} from "./src/Vehicle/App/Park/ParkVehicleCommandHandler.ts";
import {ParkingValet} from "./src/Vehicle/App/Park/ParkingValet.ts";
import {VehicleAlreadyParkedAtLocation} from "./src/Vehicle/Domain/VehicleAlreadyParkedAtLocation.ts";
import {FindFleetQuery} from "./src/Fleet/App/Find/FindFleetQuery.ts";
import {FleetFinder} from "./src/Fleet/App/Find/FleetFinder.ts";
import {FindFleetQueryHandler} from "./src/Fleet/App/Find/FindFleetQueryHandler.ts";
import {FleetNotFound} from "./src/Fleet/Domain/FleetNotFound.ts";
import {PostgresFleetRepository} from "./src/Fleet/Infra/PostgresFleetRepository.ts";
import {PostgresVehicleRepository} from "./src/Vehicle/Infra/PostgresVehicleRepository.ts";
import {PostgresUserRepository} from "./src/User/Infra/PostgresUserRepository.ts";

const program = new Command();

async function createUser(userId: string): Promise<void> {
    try {
        const userName = "Fulll";
        const createUserCommand = new CreateUserCommand(userId, userName);
        const userCreator = new UserCreator(new PostgresUserRepository(), new InFileEventBus());
        const createUserCommandHandler = new CreateUserCommandHandler(userCreator);
        await createUserCommandHandler.handle(createUserCommand);
    } catch (error) {
        if (error instanceof UserAlreadyExists) {
            console.log(`User with id ${userId} already exists`);
        }
    }
}

async function ensuresFleetExists(fleetId: string): Promise<void> {
    const findFleetQuery = new FindFleetQuery(fleetId);
    const fleetFinder = new FleetFinder(new PostgresFleetRepository());
    const findFleetQueryHandler = new FindFleetQueryHandler(fleetFinder);
    await findFleetQueryHandler.handle(findFleetQuery);
}

async function createVehicle(vehiclePlateNumber: string): Promise<void> {
    try {
        const vehicleId = crypto.randomUUID();
        const createVehicleCommand = new CreateVehicleCommand(vehicleId, vehiclePlateNumber);
        const vehicleCreator = new VehicleCreator(new PostgresVehicleRepository(), new InFileEventBus());
        const createVehicleCommandHandler = new CreateVehicleCommandHandler(vehicleCreator);
        await createVehicleCommandHandler.handle(createVehicleCommand);
    } catch (error) {
        if (error instanceof VehicleAlreadyExists) {
            console.log(`Vehicle with plate number ${vehiclePlateNumber} already exists`);
        }
    }
}

async function createFleet(userId: string, fleetName: string = 'New Fleet'): Promise<string> {
    const fleetId = crypto.randomUUID();
    const createFleetCommand = new CreateFleetCommand(fleetId, fleetName, userId);
    const fleetCreator = new FleetCreator(new PostgresFleetRepository(), new InFileEventBus());
    const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
    await createFleetHandler.handle(createFleetCommand);
    return fleetId;
}

program
    .command('create <userId>')
    .description('Create a fleet')
    .action(async (userId: string) => {
        await createUser(userId);
        const fleetId = await createFleet(userId);
        console.log(`Fleet ${fleetId} created`);
    });

program
    .command('register-vehicle <fleetId> <vehiclePlateNumber>')
    .description('Register a vehicle to the fleet')
    .action(async (fleetId: string, vehiclePlateNumber: string) => {
        await createVehicle(vehiclePlateNumber);
        const registerVehicleCommand = new RegisterVehicleToFleetCommand(fleetId, vehiclePlateNumber);
        const fleetVehicleRegisterer = new FleetVehicleRegisterer(new PostgresFleetRepository(), new InFileEventBus());
        const vehicleFinder = new VehicleFinder(new PostgresVehicleRepository());
        const fleetVehicleRegisterCommandHandler = new RegisterVehicleToFleetCommandHandler(fleetVehicleRegisterer, vehicleFinder);

        try {
            await fleetVehicleRegisterCommandHandler.handle(registerVehicleCommand);
            console.log(`Vehicle with plate number ${vehiclePlateNumber} registered to fleet ${fleetId}`);
        } catch (error) {
            if (error instanceof FleetNotFound) {
                console.error(`Fleet with id ${fleetId} not found`);
                return;
            }
        }
    });

program
    .command('localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng> [alt]')
    .description('Localize a vehicle')
    .allowUnknownOption(true)
    .action(async (fleetId: string, vehiclePlateNumber: string, lat: string, lng: string, alt: string = '0') => {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const altitude = parseFloat(alt);

        if (isNaN(latitude) || isNaN(longitude) || isNaN(altitude)) {
            console.error("Invalid coordinates: lat, lng, and alt must be numbers.");
            return;
        }

        try {
            await ensuresFleetExists(fleetId);
        } catch (error) {
            if (error instanceof FleetNotFound) {
                console.error(`Fleet with id ${fleetId} not found`);
                return;
            }
        }

        const parkVehicleCommand = new ParkVehicleCommand(vehiclePlateNumber, latitude, longitude, altitude);
        const parkVehicleCommandHandler = new ParkVehicleCommandHandler(new ParkingValet(new PostgresVehicleRepository(), new InFileEventBus()));

        try {
            await parkVehicleCommandHandler.handle(parkVehicleCommand);
            console.log(`Vehicle with plate number ${vehiclePlateNumber} localized at ${latitude}, ${longitude}, ${altitude}`);
        } catch (error: unknown) {
            if (error instanceof VehicleAlreadyParkedAtLocation) {
                console.warn(`Vehicle with id ${vehiclePlateNumber} is already parked at this location`);
            }
        }
    });

program.parse(process.argv);