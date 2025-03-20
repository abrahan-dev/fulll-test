import { sql } from "bun";
import type { VehicleRepository } from "../Domain/VehicleRepository.ts";
import { Vehicle } from "../Domain/Vehicle.ts";
import { VehiclePlateNumber } from "../Domain/ValueObject/VehiclePlateNumber.ts";
import { VehicleId } from "../Domain/ValueObject/VehicleId.ts";
import { GeoLocation } from "../../shared/Domain/ValueObject/GeoLocation.ts";

export class PostgresVehicleRepository implements VehicleRepository {
  async save(vehicle: Vehicle): Promise<void> {
    const location = vehicle.getLocation();
    const latitude = location ? location.getLatitude() : undefined;
    const longitude = location ? location.getLongitude() : undefined;
    const altitude = location ? location.getAltitude() : undefined;

    await sql`
            INSERT INTO vehicles (id, plate_number, created_at, updated_at, latitude, longitude, altitude)
            VALUES (
                ${vehicle.getId().getValue()}, 
                ${vehicle.getPlateNumber().getValue()}, 
                ${new Date()}, 
                ${new Date()}, 
                ${latitude !== undefined ? latitude : null}, 
                ${longitude !== undefined ? longitude : null}, 
                ${altitude !== undefined ? altitude : null}
            )
            ON CONFLICT (id) 
            DO UPDATE SET 
                plate_number = EXCLUDED.plate_number,
                updated_at = EXCLUDED.updated_at,
                latitude = EXCLUDED.latitude,
                longitude = EXCLUDED.longitude,
                altitude = EXCLUDED.altitude
            RETURNING *;
    `;
  }

  async search(plateNumber: VehiclePlateNumber): Promise<Vehicle | null> {
    const result =
      await sql`SELECT id, plate_number, longitude, latitude, altitude FROM vehicles WHERE plate_number = ${plateNumber.getValue()}`.values();

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    if (row[2] === null || row[3] === null) {
      return new Vehicle(new VehicleId(row[0]), new VehiclePlateNumber(row[1]));
    }

    return new Vehicle(
      new VehicleId(row[0]),
      new VehiclePlateNumber(row[1]),
      new GeoLocation(row[2], row[3], row[4] ? row[4] : undefined),
    );
  }
}
