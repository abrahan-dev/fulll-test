export class CreateFleetCommand {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly userId: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getUserId(): string {
    return this.userId;
  }
}
