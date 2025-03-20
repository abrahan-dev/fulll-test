import type { UserRepository } from "../Domain/UserRepository.ts";
import { User } from "../Domain/User.ts";
import { UserId } from "../Domain/ValueObject/UserId.ts";
import { UserName } from "../Domain/ValueObject/UserName.ts";
import { sql } from "bun";

export class PostgresUserRepository implements UserRepository {
  async save(user: User): Promise<void> {
    await sql`
            INSERT INTO users (id, name, created_at, updated_at)
            VALUES (
                ${user.getId().getValue()}, 
                ${user.getName().getValue()}, 
                ${new Date()}, 
                ${new Date()}
            )
            ON CONFLICT (id) 
            DO UPDATE SET 
                name = EXCLUDED.name,
                updated_at = EXCLUDED.updated_at
            RETURNING *;
        `;
  }

  async search(id: UserId): Promise<User | null> {
    const result =
      await sql`SELECT id, name FROM users WHERE id = ${id.getValue()}`;

    if (result.length === 0) {
      return null;
    }

    const row = result[0];

    return new User(new UserId(row[0]), new UserName(row[1]));
  }
}
