export class StringValueObject {
  constructor(private readonly value: string) {
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }
}
