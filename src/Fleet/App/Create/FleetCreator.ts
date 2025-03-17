import type {FleetRepository} from "../../Domain/FleetRepository.ts";
import type {EventBus} from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type {FleetId} from "../../Domain/ValueObject/FleetId.ts";
import type {FleetName} from "../../Domain/ValueObject/FleetName.ts";
import {Fleet} from "../../Domain/Fleet.ts";

export class FleetCreator {
    constructor(
        private readonly repository: FleetRepository,
        private readonly bus: EventBus
    ) {}

    run(id: FleetId, name: FleetName): void {
        const fleet = Fleet.create(id, name);

        this.repository.save(fleet);
        this.bus.publish(fleet.pullDomainEvents());
    }
}
