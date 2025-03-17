import {DomainEvent} from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class FleetCreatedDomainEvent extends DomainEvent {
    constructor(
        id: string,
        private readonly name: string,
        eventId?: string,
        occurredOn?: string
    ) {
        super(id, eventId, occurredOn);
    }

    static eventName(): string {
        return "fleet.created";
    }

    fromPrimitives(aggregateId: string, body: Record<string, unknown>, eventId: string, occurredOn: string): DomainEvent {
        return new FleetCreatedDomainEvent(aggregateId, body["name"] as string, eventId, occurredOn);
    }

    toPrimitives(): Record<string, string> {
        return {
            name: this.name,
        };
    }

    getName(): string {
        return this.name;
    }
}