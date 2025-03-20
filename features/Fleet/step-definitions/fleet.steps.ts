import { Given, When, Then, BeforeAll, Before } from "@cucumber/cucumber";
import { clearInFileRepository } from "../utilities/clearInFileRepository.ts";
import {FleetTestContext} from "../context/FleetTestContext.ts";
import {clearDatabaseRepository} from "../utilities/clearDatabaseRepository.ts";

BeforeAll(async function () {
    clearInFileRepository();
    await clearDatabaseRepository();
});

Before(function (scenario) {
    const useDatabase = scenario.pickle.tags.some(tag => tag.name === "@critical");
    this.context = new FleetTestContext(useDatabase);
});

Given(/^my fleet$/, async function () {
    await this.context.createFleet("My fleet");
});

Given(/^a vehicle$/, async function () {
    const randomPlate = `XX-${Math.floor(100 + Math.random() * 900)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
    await this.context.createVehicle(randomPlate);
});

When(/^I register this vehicle into my fleet$/, async function () {
    await this.context.registerVehicleToFleet();
});

Then(/^this vehicle should be part of my vehicle fleet$/, async function () {
    if (!(await this.context.isVehicleInFleet())) {
        throw new Error("Vehicle is not registered in the fleet");
    }
});

Given(/^I have registered this vehicle into my fleet$/, async function () {
    await this.context.registerVehicleToFleet();
});

When(/^I try to register this vehicle into my fleet$/, async function () {
    await this.context.registerVehicleToFleet();
});

Then(/^I should be informed that this vehicle has already been registered into my fleet$/, function () {
    if (!this.context.isCurrentVehicleAlreadyRegisteredInFleet) {
        throw new Error("No duplicate registration detected");
    }
});

Given(/^the fleet of another user$/, async function () {
    await this.context.createOtherUserFleet();
});

Given(/^this vehicle has been registered into the other user's fleet$/, async function () {
    await this.context.registerVehicleToOtherFleet();
});

Given(/^a location$/, function () {
    this.context.createLocation();
});

When(/^I park my vehicle at this location$/, async function () {
    await this.context.parkVehicleAtLocation();
});

Then(/^the known location of my vehicle should verify this location$/, async function () {
    if (!(await this.context.isVehicleParkedAtLocation())) {
        throw new Error("Vehicle is not parked at the expected location");
    }
});

Given(/^my vehicle has been parked into this location$/, async function () {
    await this.context.parkVehicleAtLocation();
});

When(/^I try to park my vehicle at this location$/, async function () {
    await this.context.parkVehicleAtLocation();
});

Then(/^I should be informed that my vehicle is already parked at this location$/, function () {
    if (!this.context.isCurrentVehicleAlreadyParkedAtCurrentLocation) {
        throw new Error("Vehicle should be parked at this location already");
    }
});
