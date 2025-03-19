export class ParkVehicleCommand {
    constructor(
        private readonly id: string,
        private readonly latitude: number,
        private readonly longitude: number
    ) {}

    getId(): string {
        return this.id;
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }
}
