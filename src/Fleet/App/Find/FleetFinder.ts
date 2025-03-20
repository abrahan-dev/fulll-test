import type { FleetRepository } from "../../Domain/FleetRepository.ts";
import type { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import type { Fleet } from "../../Domain/Fleet.ts";
import { FleetNotFound } from "../../Domain/FleetNotFound.ts";

export class FleetFinder {
  constructor(private readonly repository: FleetRepository) {}

  public async find(fleetId: FleetId): Promise<Fleet> {
    const fleet = await this.repository.search(fleetId);

    if (!fleet) {
      throw new FleetNotFound(fleetId);
    }

    return fleet;
  }
}
