export class UserAlreadyExists extends Error {
  constructor(userId: string) {
    super(`User with id ${userId} already exists`);
  }
}
