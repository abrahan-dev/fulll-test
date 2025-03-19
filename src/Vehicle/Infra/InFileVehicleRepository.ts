import * as fs from "fs";
import * as path from "path";
import {fileURLToPath} from "node:url";
import type {VehicleRepository} from "../Domain/VehicleRepository.ts";
import type {VehicleId} from "../Domain/ValueObject/VehicleId.ts";
import type {Vehicle} from "../Domain/Vehicle.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileVehicleRepository implements VehicleRepository {
    private static readonly FILE_PATH = path.resolve(__dirname, "../../../features/database/");

    save(vehicle: Vehicle): void {
        const filePath = this.fileName(vehicle.getId().getValue());
        fs.writeFileSync(filePath, JSON.stringify(vehicle, null, 2));
    }

    search(id: VehicleId): Vehicle | null {
        const filePath = this.fileName(id.getValue());

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data) as Vehicle;
    }

    private fileName(eventId: string): string {
        return path.join(InFileVehicleRepository.FILE_PATH, `${eventId}.vehicle.json`);
    }
}
