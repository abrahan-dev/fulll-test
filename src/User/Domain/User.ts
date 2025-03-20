import { UserName } from "./ValueObject/UserName.ts";
import { UserId } from "./ValueObject/UserId.ts";
import { AggregateRoot } from "../../shared/Domain/Aggregate/AggregateRoot.ts";
import { UserCreatedDomainEvent } from "./UserCreatedDomainEvent.ts";

export class User extends AggregateRoot {
  constructor(
    private readonly id: UserId,
    private name: UserName,
  ) {
    super();
  }

  static create(id: UserId, name: UserName): User {
    const user = new User(id, name);

    user.record(new UserCreatedDomainEvent(id.getValue(), name.getValue()));

    return user;
  }

  getId(): UserId {
    return this.id;
  }

  getName(): UserName {
    return this.name;
  }

  rename(newName: UserName): void {
    this.name = newName;
  }

  static fromPrimitives(primitives: { id: string; name: string }): User {
    return new User(new UserId(primitives.id), new UserName(primitives.name));
  }
}
