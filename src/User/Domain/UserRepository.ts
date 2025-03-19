import type {User} from "./User.ts";
import type {UserId} from "./ValueObject/UserId.ts";

export interface UserRepository {
    save(fleet: User): void;
    search(id: UserId): User | null;
}
