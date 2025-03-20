export class Uuid {
  constructor(private readonly value: string) {
    this.ensureIsValidUuid(value);
    this.value = value;
  }

  static random(): Uuid {
    const uuid = crypto.randomUUID();

    return new Uuid(uuid.toString());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Uuid): boolean {
    return this.value === other.getValue();
  }

  toString(): string {
    return this.getValue();
  }

  private ensureIsValidUuid(id: string): void {
    if (!this.isValidUuid(id)) {
      throw new Error(
        `${this.constructor.name} does not allow the value <${id}>.`,
      );
    }
  }

  private isValidUuid(uuid: string): boolean {
    return uuid.length === 36 && this.isValidUuidRegex(uuid);
  }

  private isValidUuidRegex(uuid: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      uuid,
    );
  }
}
