import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
import type { VehicleRepository } from "../Domain/VehicleRepository.ts";
import { Vehicle } from "../Domain/Vehicle.ts";
import type { VehiclePlateNumber } from "../Domain/ValueObject/VehiclePlateNumber.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileVehicleRepository implements VehicleRepository {
  private static readonly FILE_PATH = path.resolve(
    __dirname,
    "../../../features/database/",
  );

  async save(vehicle: Vehicle): Promise<void> {
    const filePath = this.fileName(vehicle.getPlateNumber().getValue());
    fs.writeFileSync(filePath, JSON.stringify(vehicle, null, 2));
  }

  async search(plateNumber: VehiclePlateNumber): Promise<Vehicle | null> {
    const filePath = this.fileName(plateNumber.getValue());

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const vehicleData = JSON.parse(data);

    return Vehicle.fromPrimitives({
      id: vehicleData.id.value,
      plateNumber: vehicleData.plateNumber.value,
      longitude: vehicleData.location?.coordinates[0],
      latitude: vehicleData.location?.coordinates[1],
      altitude: vehicleData.location?.coordinates[2],
    });
  }

  private fileName(plateNumber: string): string {
    return path.join(
      InFileVehicleRepository.FILE_PATH,
      `${plateNumber}.vehicle.json`,
    );
  }
}
