export class RegisterVehicleToFleetCommand {
    constructor(
        private readonly fleetId: string,
        private readonly vehicleId: string
    ) {}

    getFleetId(): string {
        return this.fleetId;
    }

    getVehicleId(): string {
        return this.vehicleId;
    }
}
