import { compare, genSalt, hash } from 'bcryptjs';

export class AuthUtils {

    static async validatePassword(password: string, passwordHash: string): Promise<boolean> {
        return await compare(password, passwordHash);
    }

    static async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(12);

        return await hash(password, salt);
    }

}
