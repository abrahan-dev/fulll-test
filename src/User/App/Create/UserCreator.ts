import type { EventBus } from "../../../shared/Domain/Bus/Event/EventBus.ts";
import type { UserRepository } from "../../Domain/UserRepository.ts";
import { User } from "../../Domain/User.ts";
import type { UserId } from "../../Domain/ValueObject/UserId.ts";
import type { UserName } from "../../Domain/ValueObject/UserName.ts";
import { UserAlreadyExists } from "../../Domain/UserAlreadyExists.ts";

export class UserCreator {
  constructor(
    private readonly repository: UserRepository,
    private readonly bus: EventBus,
  ) {}

  async run(id: UserId, name: UserName): Promise<void> {
    const existingUser = await this.repository.search(id);

    if (existingUser) {
      throw new UserAlreadyExists(`User with id ${id} already exists`);
    }

    const user = User.create(id, name);

    await this.repository.save(user);
    this.bus.publish(user.pullDomainEvents());
  }
}
