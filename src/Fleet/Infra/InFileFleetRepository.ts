import * as fs from "fs";
import * as path from "path";
import type { FleetRepository } from "../Domain/FleetRepository.ts";
import type { FleetId } from "../Domain/ValueObject/FleetId.ts";
import { fileURLToPath } from "node:url";
import { Fleet } from "../Domain/Fleet.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileFleetRepository implements FleetRepository {
  private static readonly FILE_PATH = path.resolve(
    __dirname,
    "../../../features/database/",
  );

  async save(fleet: Fleet): Promise<void> {
    const filePath = this.fileName(fleet.getId().getValue());
    fs.writeFileSync(filePath, JSON.stringify(fleet, null, 2));
  }

  async search(id: FleetId): Promise<Fleet | null> {
    const filePath = this.fileName(id.getValue());

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const fleetData = JSON.parse(data);

    return Fleet.fromPrimitives({
      id: fleetData.id.value,
      name: fleetData.name.value,
      vehicles: fleetData.vehicles.map(
        (vehicle: { value: string }) => vehicle.value,
      ),
      userId: fleetData.userId.value,
    });
  }

  private fileName(eventId: string): string {
    return path.join(InFileFleetRepository.FILE_PATH, `${eventId}.fleet.json`);
  }
}
