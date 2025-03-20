import { sql } from "bun";

export function clearDatabaseRepository() {
    return Promise.all([
        sql`DELETE FROM fleet_vehicles;`,
        sql`DELETE FROM vehicles;`,
        sql`DELETE FROM fleets;`,
        sql`DELETE FROM users;`
    ]);
}
