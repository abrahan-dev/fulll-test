CREATE TABLE IF NOT EXISTS users
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) NOT NULL,
    created_at TIMESTAMP        DEFAULT NOW(),
    updated_at TIMESTAMP        DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fleets
(
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name       VARCHAR(255) NOT NULL,
    user_id    UUID         NOT NULL,
    created_at TIMESTAMP        DEFAULT NOW(),
    updated_at TIMESTAMP        DEFAULT NOW(),
    CONSTRAINT fk_fleets_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vehicles
(
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plate_number VARCHAR(20) UNIQUE NOT NULL,
    created_at   TIMESTAMP        DEFAULT NOW(),
    updated_at   TIMESTAMP        DEFAULT NOW()
);

ALTER TABLE vehicles
    ADD COLUMN latitude FLOAT,
    ADD COLUMN longitude FLOAT,
    ADD COLUMN altitude FLOAT;

CREATE TABLE IF NOT EXISTS fleet_vehicles
(
    fleet_id   UUID NOT NULL,
    vehicle_id UUID NOT NULL,
    PRIMARY KEY (fleet_id, vehicle_id),
    CONSTRAINT fk_fleet_vehicles_fleet FOREIGN KEY (fleet_id) REFERENCES fleets (id) ON DELETE CASCADE,
    CONSTRAINT fk_fleet_vehicles_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles (id) ON DELETE CASCADE
);