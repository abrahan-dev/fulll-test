import type {VehicleId} from "./ValueObject/VehicleId.ts";
import type {Vehicle} from "./Vehicle.ts";

export interface VehicleRepository {
    save(vehicle: Vehicle): void;
    search(id: VehicleId): Vehicle | null;
}
