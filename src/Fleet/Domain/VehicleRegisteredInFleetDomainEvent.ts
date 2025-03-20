import { DomainEvent } from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class VehicleRegisteredInFleetDomainEvent extends DomainEvent {
  constructor(
    id: string,
    private readonly fleetId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static eventName(): string {
    return "fleet.vehicle.registered";
  }

  fromPrimitives(
    aggregateId: string,
    body: Record<string, unknown>,
    eventId: string,
    occurredOn: string,
  ): DomainEvent {
    return new VehicleRegisteredInFleetDomainEvent(
      aggregateId,
      body["fleetId"] as string,
      eventId,
      occurredOn,
    );
  }

  toPrimitives(): Record<string, string> {
    return {
      id: this.getEventId(),
      fleetId: this.getFleetId(),
      eventId: this.getEventId(),
      occurredOn: this.getOccurredOn(),
      eventName: VehicleRegisteredInFleetDomainEvent.eventName(),
    };
  }

  getFleetId(): string {
    return this.fleetId;
  }
}
