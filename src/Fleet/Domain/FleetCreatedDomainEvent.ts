import { DomainEvent } from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class FleetCreatedDomainEvent extends DomainEvent {
  constructor(
    id: string,
    private readonly fleetName: string,
    private readonly userId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static eventName(): string {
    return "fleet.created";
  }

  fromPrimitives(
    aggregateId: string,
    body: Record<string, unknown>,
    eventId: string,
    occurredOn: string,
  ): DomainEvent {
    return new FleetCreatedDomainEvent(
      aggregateId,
      body["fleetName"] as string,
      body["userId"] as string,
      eventId,
      occurredOn,
    );
  }

  toPrimitives(): Record<string, string> {
    return {
      id: this.getEventId(),
      fleetName: this.getFleetName(),
      userId: this.getUserId(),
      eventId: this.getEventId(),
      occurredOn: this.getOccurredOn(),
      eventName: FleetCreatedDomainEvent.eventName(),
    };
  }

  getFleetName(): string {
    return this.fleetName;
  }

  getUserId(): string {
    return this.userId;
  }
}
