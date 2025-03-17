import * as fs from "fs";
import * as path from "path";
import type {FleetRepository} from "../Domain/FleetRepository.ts";
import type {Fleet} from "../Domain/Fleet.ts";
import type {FleetId} from "../Domain/ValueObject/FleetId.ts";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileFleetRepository implements FleetRepository {
    private static readonly FILE_PATH = path.join(__dirname, "fleets");

    save(fleet: Fleet): void {
        fs.writeFileSync(this.fileName(fleet.getId().getValue()), JSON.stringify(fleet));
    }

    search(id: FleetId): Fleet | null {
        const filePath = this.fileName(id.getValue());

        if (!fs.existsSync(filePath)) {
            return null;
        }

        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data) as Fleet;
    }

    private fileName(id: string): string {
        return `${InFileFleetRepository.FILE_PATH}.${id}.repo`;
    }
}
