import {DomainEvent} from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class VehicleCreatedDomainEvent extends DomainEvent {
    constructor(
        id: string,
        private readonly vehicleName: string,
        eventId?: string,
        occurredOn?: string
    ) {
        super(id, eventId, occurredOn);
    }

    static eventName(): string {
        return "vehicle.created";
    }

    fromPrimitives(aggregateId: string, body: Record<string, unknown>, eventId: string, occurredOn: string): DomainEvent {
        return new VehicleCreatedDomainEvent(aggregateId, body["vehicleName"] as string, eventId, occurredOn);
    }

    toPrimitives(): Record<string, string> {
        return {
            id: this.getEventId(),
            vehicleName: this.getVehicleName(),
            eventId: this.getEventId(),
            occurredOn: this.getOccurredOn(),
            eventName: VehicleCreatedDomainEvent.eventName(),
        };
    }

    getVehicleName(): string {
        return this.vehicleName;
    }
}
