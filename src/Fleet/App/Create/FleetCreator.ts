import type { FleetRepository } from "../../Domain/FleetRepository.ts";
import type { EventBus } from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type { FleetId } from "../../Domain/ValueObject/FleetId.ts";
import type { FleetName } from "../../Domain/ValueObject/FleetName.ts";
import { Fleet } from "../../Domain/Fleet.ts";
import type { UserId } from "../../../User/Domain/ValueObject/UserId.ts";

export class FleetCreator {
  constructor(
    private readonly repository: FleetRepository,
    private readonly bus: EventBus,
  ) {}

  async run(id: FleetId, name: FleetName, userId: UserId): Promise<void> {
    const fleet = Fleet.create(id, name, userId);

    await this.repository.save(fleet);
    this.bus.publish(fleet.pullDomainEvents());
  }
}
