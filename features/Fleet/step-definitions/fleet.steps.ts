import { Given, When, Then, BeforeAll, Before } from "@cucumber/cucumber";
import { clearInFileRepositoryFolder } from "../utilities/clearInFileRepositoryFolder.ts";
import {FleetTestContext} from "../context/FleetTestContext.ts";

BeforeAll(function async () {
    clearInFileRepositoryFolder();
});

Before(function () {
    this.context = new FleetTestContext();
});

Given(/^my fleet$/, function () {
    this.context.createFleet("My fleet");
});

Given(/^a vehicle$/, function () {
    this.context.createVehicle("My vehicle");
});

When(/^I register this vehicle into my fleet$/, function () {
    this.context.registerVehicleToFleet();
});

Then(/^this vehicle should be part of my vehicle fleet$/, function () {
    if (!this.context.isVehicleInFleet()) {
        throw new Error("Vehicle is not registered in the fleet");
    }
});

Given(/^I have registered this vehicle into my fleet$/, function () {
    this.context.registerVehicleToFleet();
});

When(/^I try to register this vehicle into my fleet$/, function () {
    this.context.registerVehicleToFleet();
});

Then(/^I should be informed that this vehicle has already been registered into my fleet$/, function () {
    if (!this.context.isCurrentVehicleAlreadyRegisteredInFleet) {
        throw new Error("No duplicate registration detected");
    }
});

Given(/^the fleet of another user$/, function () {
    this.context.createOtherUserFleet();
});

Given(/^this vehicle has been registered into the other user's fleet$/, function () {
    this.context.registerVehicleToOtherFleet();
});

Given(/^a location$/, function () {
    this.context.createLocation();
});

When(/^I park my vehicle at this location$/, function () {
    this.context.parkVehicleAtLocation();
});

Then(/^the known location of my vehicle should verify this location$/, function () {
    if (!this.context.isVehicleParkedAtLocation()) {
        throw new Error("Vehicle is not parked at the expected location");
    }
});

Given(/^my vehicle has been parked into this location$/, function () {
    this.context.parkVehicleAtLocation();
});

When(/^I try to park my vehicle at this location$/, function () {
    this.context.parkVehicleAtLocation();
});

Then(/^I should be informed that my vehicle is already parked at this location$/, function () {
    if (!this.context.isCurrentVehicleAlreadyParkedAtCurrentLocation) {
        throw new Error("Vehicle should be parked at this location already");
    }
});
