import type {FleetId} from "./ValueObject/FleetId.ts";
import type {Fleet} from "./Fleet.ts";

export interface FleetRepository {
    save(course: Fleet): void;
    search(id: FleetId): Fleet | null;
}
