import * as fs from "fs";
import * as path from "path";
import type { UserRepository } from "../Domain/UserRepository.ts";
import type { UserId } from "../Domain/ValueObject/UserId.ts";
import { fileURLToPath } from "node:url";
import { User } from "../Domain/User.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class InFileUserRepository implements UserRepository {
  private static readonly FILE_PATH = path.resolve(
    __dirname,
    "../../../features/database/",
  );

  async save(user: User): Promise<void> {
    const filePath = this.fileName(user.getId().getValue());
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
  }

  async search(id: UserId): Promise<User | null> {
    const filePath = this.fileName(id.getValue());

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const userData = JSON.parse(data);

    return User.fromPrimitives({
      id: userData.id.value,
      name: userData.name.value,
    });
  }

  private fileName(eventId: string): string {
    return path.join(InFileUserRepository.FILE_PATH, `${eventId}.user.json`);
  }
}
