import * as fs from "node:fs";
import * as path from "node:path";
import {fileURLToPath} from "node:url";

export function clearInFileRepository(): void {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const folderPath = path.resolve(__dirname, "../../database/");

        const files = fs.readdirSync(folderPath).filter(filePath => /(user\.json|vehicle\.json|event\.json|fleet\.json)$/.test(filePath));

        files.map((file) => {
            const filePath = path.join(folderPath, file);
            fs.unlinkSync(filePath)
        });
    } catch (error) {
        console.error(`Error clearing folder: ${error}`);
    }
}
