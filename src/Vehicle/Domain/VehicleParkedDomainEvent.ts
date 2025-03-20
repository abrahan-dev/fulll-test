import { DomainEvent } from "../../shared/Domain/Bus/Event/DomainEvent.ts";

export class VehicleParkedDomainEvent extends DomainEvent {
  constructor(
    id: string,
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly altitude?: number,
    eventId?: string,
    occurredOn?: string,
  ) {
    super(id, eventId, occurredOn);
  }

  static eventName(): string {
    return "vehicle.parked";
  }

  fromPrimitives(
    aggregateId: string,
    body: Record<string, unknown>,
    eventId: string,
    occurredOn: string,
  ): DomainEvent {
    return new VehicleParkedDomainEvent(
      aggregateId,
      body["latitude"] as number,
      body["longitude"] as number,
      body["altitude"] as number,
      eventId,
      occurredOn,
    );
  }

  toPrimitives(): Record<string, unknown> {
    return {
      id: this.getEventId(),
      latitude: this.getLatitude(),
      longitude: this.getLongitude(),
      altitude: this.getAltitude(),
      eventId: this.getEventId(),
      occurredOn: this.getOccurredOn(),
      eventName: VehicleParkedDomainEvent.eventName(),
    };
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  getAltitude(): number | undefined {
    return this.altitude;
  }
}
