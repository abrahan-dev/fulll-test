export class CreateVehicleCommand {
  constructor(
    private readonly id: string,
    private readonly plateNumber: string,
  ) {}

  getId(): string {
    return this.id;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }
}
