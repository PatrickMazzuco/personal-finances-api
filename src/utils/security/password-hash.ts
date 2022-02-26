import * as bcrypt from 'bcrypt';

export class PasswordHash {
  public static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
