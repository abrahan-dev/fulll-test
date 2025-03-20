export class RegisterVehicleToFleetCommand {
  constructor(
    private readonly fleetId: string,
    private readonly plateNumber: string,
  ) {}

  getFleetId(): string {
    return this.fleetId;
  }

  getPlateNumber(): string {
    return this.plateNumber;
  }
}
