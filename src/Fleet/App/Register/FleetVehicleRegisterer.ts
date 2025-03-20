import type { FleetRepository } from "../../Domain/FleetRepository.ts";
import type { EventBus } from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import type { VehicleId } from "../../../Vehicle/Domain/ValueObject/VehicleId.ts";
import { FleetNotFound } from "../../Domain/FleetNotFound.ts";

export class FleetVehicleRegisterer {
  constructor(
    private readonly repository: FleetRepository,
    private readonly bus: EventBus,
  ) {}

  async register(fleetId: FleetId, vehicleId: VehicleId): Promise<void> {
    const fleet = await this.repository.search(fleetId);

    if (!fleet) {
      throw new FleetNotFound(fleetId);
    }

    fleet.registerVehicle(vehicleId);
    await this.repository.save(fleet);
    this.bus.publish(fleet.pullDomainEvents());
  }
}
