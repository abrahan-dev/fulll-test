import * as fs from "fs";
import * as path from "path";
import type { EventBus } from "../../../Domain/Bus/Event/EventBus.ts";
import type { DomainEvent } from "../../../Domain/Bus/Event/DomainEvent.ts";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileEventBus implements EventBus {
  private static readonly FILE_PATH = path.resolve(
    __dirname,
    "../../../../../features/database/",
  );

  constructor() {
    if (!fs.existsSync(InFileEventBus.FILE_PATH)) {
      fs.mkdirSync(InFileEventBus.FILE_PATH, { recursive: true });
    }
  }

  publish(events: DomainEvent[]): void {
    events.forEach((event) => {
      const filePath = this.fileName(event.getEventId());
      fs.writeFileSync(filePath, JSON.stringify(event.toPrimitives(), null, 2));
    });
  }

  private fileName(eventId: string): string {
    return path.join(InFileEventBus.FILE_PATH, `${eventId}.event.json`);
  }
}
