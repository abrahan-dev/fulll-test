export class GeoLocation {
  private readonly type: "Point" = "Point";
  private readonly coordinates: [number, number, number?]; // [longitude, latitude, altitude?]

  constructor(longitude: number, latitude: number, altitude?: number) {
    this.ensureValidCoordinates(longitude, latitude, altitude);
    this.coordinates =
      altitude !== undefined
        ? [longitude, latitude, altitude]
        : [longitude, latitude];
  }

  private ensureValidCoordinates(
    longitude: number,
    latitude: number,
    altitude?: number,
  ): void {
    if (longitude < -180 || longitude > 180) {
      throw new Error("Longitude must be between -180 and 180 degrees.");
    }
    if (latitude < -90 || latitude > 90) {
      throw new Error("Latitude must be between -90 and 90 degrees.");
    }
    if (altitude !== undefined && (altitude < -500 || altitude > 10000)) {
      throw new Error("Altitude must be between -500 and 10,000 meters.");
    }
  }

  public equals(other: GeoLocation): boolean {
    return (
      this.coordinates[0] === other.coordinates[0] &&
      this.coordinates[1] === other.coordinates[1] &&
      (this.coordinates[2] === other.coordinates[2] ||
        (this.coordinates[2] === undefined &&
          other.coordinates[2] === undefined))
    );
  }

  public toJSON(): { type: "Point"; coordinates: [number, number, number?] } {
    return { type: this.type, coordinates: this.coordinates };
  }

  public getLongitude(): number {
    return this.coordinates[0];
  }

  public getLatitude(): number {
    return this.coordinates[1];
  }

  public getAltitude(): number | undefined {
    return this.coordinates[2];
  }

  public static random(): GeoLocation {
    const longitude = Math.random() * 360 - 180;
    const latitude = Math.random() * 180 - 90;
    const altitude = Math.random() * 10000;

    return new GeoLocation(longitude, latitude, altitude);
  }
}
