import type { User } from "./User.ts";
import type { UserId } from "./ValueObject/UserId.ts";

export interface UserRepository {
  save(fleet: User): Promise<void>;
  search(id: UserId): Promise<User | null>;
}
