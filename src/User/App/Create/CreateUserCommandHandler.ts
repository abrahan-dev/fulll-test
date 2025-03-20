import type { CommandHandler } from "../../../shared/Domain/Bus/Command/CommandHandler.ts";
import type { CreateUserCommand } from "./CreateUserCommand.ts";
import { UserName } from "../../Domain/ValueObject/UserName.ts";
import { UserId } from "../../Domain/ValueObject/UserId.ts";
import type { UserCreator } from "./UserCreator.ts";

export class CreateUserCommandHandler implements CommandHandler {
  constructor(private readonly creator: UserCreator) {}

  async handle(command: CreateUserCommand): Promise<void> {
    const id = new UserId(command.getId());
    const name = new UserName(command.getName());

    await this.creator.run(id, name);
  }
}
