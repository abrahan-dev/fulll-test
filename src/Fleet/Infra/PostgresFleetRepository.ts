import { sql } from "bun";
import type { FleetRepository } from "../Domain/FleetRepository.ts";
import { Fleet } from "../Domain/Fleet.ts";
import { FleetId } from "../Domain/ValueObject/FleetId.ts";
import { FleetName } from "../Domain/ValueObject/FleetName.ts";
import { UserId } from "../../User/Domain/ValueObject/UserId.ts";
import { VehicleId } from "../../Vehicle/Domain/ValueObject/VehicleId.ts";

export class PostgresFleetRepository implements FleetRepository {
  async save(fleet: Fleet): Promise<void> {
    const fleetVehicles = fleet.getVehicles().map((vehicleId) => {
      return {
        fleet_id: fleet.getId().getValue(),
        vehicle_id: vehicleId.getValue(),
      };
    });

    await sql.begin(async (trx) => {
      await trx`
                INSERT INTO fleets (id, name, user_id, created_at, updated_at)
                VALUES (${fleet.getId().getValue()}, ${fleet.getName().getValue()}, ${fleet.getUserId().getValue()}, ${new Date()}, ${new Date()})
                ON CONFLICT (id) DO UPDATE 
                SET name = EXCLUDED.name, 
                    user_id = EXCLUDED.user_id, 
                    updated_at = EXCLUDED.updated_at
            `;

      await trx`DELETE FROM fleet_vehicles WHERE fleet_id = ${fleet.getId().getValue()}`;

      if (fleetVehicles.length > 0) {
        await trx`INSERT INTO fleet_vehicles ${sql(fleetVehicles)}`;
      }
    });
  }

  async search(id: FleetId): Promise<Fleet | null> {
    const resultFleets =
      await sql`SELECT id, name, user_id FROM fleets WHERE id = ${id.getValue()}`.values();
    const resultVehicles =
      await sql`SELECT fleet_id, vehicle_id FROM fleet_vehicles WHERE fleet_id = ${id.getValue()}`.values();

    if (resultFleets.length === 0) {
      return null;
    }

    const row = resultFleets[0];

    return new Fleet(
      new FleetId(row[0]),
      new FleetName(row[1]),
      resultVehicles.length === 0
        ? []
        : resultVehicles[0].map(
            (vehicleId: string) => new VehicleId(vehicleId),
          ),
      new UserId(row[2]),
    );
  }
}
