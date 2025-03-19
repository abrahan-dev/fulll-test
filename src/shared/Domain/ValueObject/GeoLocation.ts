export class GeoLocation {
    private readonly type: "Point" = "Point";
    private readonly coordinates: [number, number]; // [longitude, latitude]

    constructor(longitude: number, latitude: number) {
        this.ensureValidCoordinates(longitude, latitude);
        this.coordinates = [longitude, latitude];
    }

    private ensureValidCoordinates(longitude: number, latitude: number): void {
        if (longitude < -180 || longitude > 180) {
            throw new Error("Longitude must be between -180 and 180 degrees.");
        }
        if (latitude < -90 || latitude > 90) {
            throw new Error("Latitude must be between -90 and 90 degrees.");
        }
    }

    public equals(other: GeoLocation): boolean {
        return (
            this.coordinates[0] === other.coordinates[0] &&
            this.coordinates[1] === other.coordinates[1]
        );
    }

    public toJSON(): { type: "Point"; coordinates: [number, number] } {
        return { type: this.type, coordinates: this.coordinates };
    }

    public distanceTo(other: GeoLocation): number {
        const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

        const [lon1, lat1] = this.coordinates;
        const [lon2, lat2] = other.coordinates;

        const R = 6371; // Earth's radius in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    }

    public getLongitude(): number {
        return this.coordinates[0];
    }

    public getLatitude(): number {
        return this.coordinates[1];
    }

    public static random(): GeoLocation {
        const longitude = (Math.random() * 360) - 180;
        const latitude = (Math.random() * 180) - 90;
        return new GeoLocation(longitude, latitude);
    }
}
