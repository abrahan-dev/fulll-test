import {AggregateRoot} from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import type {FleetId} from "./ValueObject/FleetId.ts";
import type {FleetName} from "./ValueObject/FleetName.ts";
import {FleetCreatedDomainEvent} from "./FleetCreatedDomainEvent.ts";

export class Fleet extends AggregateRoot {
    constructor(
        private readonly id: FleetId,
        private name: FleetName,
    ) {
        super();
    }

    static create(id: FleetId, name: FleetName): Fleet {
        const fleet = new Fleet(id, name);

        fleet.record(new FleetCreatedDomainEvent(id.getValue(), name.getValue()));

        return fleet;
    }

    getId(): FleetId {
        return this.id;
    }

    getName(): FleetName {
        return this.name;
    }

    rename(newName: FleetName): void {
        this.name = newName;
    }
}