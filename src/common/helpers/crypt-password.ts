import * as bcrypt from 'bcrypt';

export class CryptPassword {
    static hash({ password }): Promise<string> {
        return Promise.resolve(bcrypt.hash(password, 10));
    }

    static compare(password: string, hashPassword: string): Promise<boolean> {
        return Promise.resolve(bcrypt.compare(password, hashPassword));
    }
}
