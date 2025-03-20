export class VehicleAlreadyRegisteredInFleet extends Error {
  constructor(vehicleId: string, fleetId: string) {
    super(
      `Vehicle with id ${vehicleId} is already registered in fleet with id ${fleetId}`,
    );
  }
}
