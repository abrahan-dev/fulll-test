import type { DomainEvent } from "./DomainEvent.ts";

export interface EventBus {
  publish(events: DomainEvent[]): void;
}
