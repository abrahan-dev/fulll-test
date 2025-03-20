import { DomainEvent } from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(
    id: string,
    private readonly userName: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static eventName(): string {
    return "user.created";
  }

  fromPrimitives(
    aggregateId: string,
    body: Record<string, unknown>,
    eventId: string,
    occurredOn: string,
  ): DomainEvent {
    return new UserCreatedDomainEvent(
      aggregateId,
      body["userName"] as string,
      eventId,
      occurredOn,
    );
  }

  toPrimitives(): Record<string, string> {
    return {
      id: this.getEventId(),
      fleetName: this.getUserName(),
      eventId: this.getEventId(),
      occurredOn: this.getOccurredOn(),
      eventName: UserCreatedDomainEvent.eventName(),
    };
  }

  getUserName(): string {
    return this.userName;
  }
}
