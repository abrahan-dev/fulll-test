import { Given, When, Then } from "@cucumber/cucumber";
import {CreateFleetCommand} from "../../../src/Fleet/App/Create/CreateFleetCommand.ts";
import {CreateFleetCommandHandler} from "../../../src/Fleet/App/Create/CreateFleetCommandHandler.ts";
import {InFileFleetRepository} from "../../../src/Fleet/Infra/InFileFleetRepository.ts";
import {FleetCreator} from "../../../src/Fleet/App/Create/FleetCreator.ts";
import {InFileEventBus} from "../../../src/shared/Infra/Bus/Event/InFileEventBus.ts";

Given(/^my fleet$/, function () {
    const fleetId = crypto.randomUUID();
    const createFleetCommand = new CreateFleetCommand(fleetId, "My fleet");
    const fleetCreator = new FleetCreator(new InFileFleetRepository(), new InFileEventBus());
    const createFleetHandler = new CreateFleetCommandHandler(fleetCreator);
    createFleetHandler.handle(createFleetCommand);
});

Given(/^a vehicle$/, function () {

});

When(/^I register this vehicle into my fleet$/, function () {

});

Then(/^this vehicle should be part of my vehicle fleet$/, function () {

});

Given(/^I have registered this vehicle into my fleet$/, function () {

});

When(/^I try to register this vehicle into my fleet$/, function () {

});

Then(/^I should be informed this this vehicle has already been registered into my fleet$/, function () {

});

Given(/^the fleet of another user$/, function () {

});

Given(/^this vehicle has been registered into the other user's fleet$/, function () {

});