import type {EventBus} from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type {UserRepository} from "../../Domain/UserRepository.ts";
import {User} from "../../Domain/User.ts";
import type {UserId} from "../../Domain/ValueObject/UserId.ts";
import type {UserName} from "../../Domain/ValueObject/UserName.ts";

export class UserCreator {
    constructor(
        private readonly repository: UserRepository,
        private readonly bus: EventBus
    ) {}

    run(id: UserId, name: UserName): void {
        const user = User.create(id, name);

        this.repository.save(user);
        this.bus.publish(user.pullDomainEvents());
    }
}
