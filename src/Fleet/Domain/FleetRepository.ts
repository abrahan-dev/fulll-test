import type { FleetId } from "./ValueObject/FleetId.ts";
import type { Fleet } from "./Fleet.ts";

export interface FleetRepository {
  save(fleet: Fleet): Promise<void>;
  search(id: FleetId): Promise<Fleet | null>;
}
