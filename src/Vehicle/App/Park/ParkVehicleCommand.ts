export class ParkVehicleCommand {
  constructor(
    private readonly plateNumber: string,
    private readonly latitude: number,
    private readonly longitude: number,
    private readonly altitude?: number,
  ) {}

  getPlateNumber(): string {
    return this.plateNumber;
  }

  getLatitude(): number {
    return this.latitude;
  }

  getLongitude(): number {
    return this.longitude;
  }

  getAltitude(): number | undefined {
    return this.altitude;
  }
}
