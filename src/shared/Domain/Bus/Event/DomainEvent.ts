export abstract class DomainEvent {
  private readonly eventId: string;
  private readonly occurredOn: string;

  protected constructor(
    private readonly aggregateId: string,
    eventId?: string,
    occurredOn?: string,
  ) {
    this.eventId = eventId ?? crypto.randomUUID();
    this.occurredOn = occurredOn ?? new Date().toISOString();
  }

  abstract toPrimitives(): Record<string, unknown>;

  abstract fromPrimitives(
    aggregateId: string,
    body: Record<string, unknown>,
    eventId: string,
    occurredOn: string,
  ): DomainEvent;

  static eventName(): string {
    throw new Error("Method not implemented.");
  }

  getAggregateId(): string {
    return this.aggregateId;
  }

  getEventId(): string {
    return this.eventId;
  }

  getOccurredOn(): string {
    return this.occurredOn;
  }
}
