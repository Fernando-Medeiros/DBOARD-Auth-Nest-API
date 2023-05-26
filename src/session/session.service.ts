import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { SessionRepository } from './repository/session.repository';

@Injectable()
export class SessionService {
    constructor(private readonly repository: SessionRepository) {}

    async validateCustomer(query: { id?: string; email?: string }) {
        const { id, email } = query;

        const where = {
            ...(id && { id }),
            ...(email && { email }),
        };
        return this.repository.findOne(where);
    }

    async validateToken<T = { sub: string; scope: string }>(token: string): Promise<T> {
        return verify(token, process.env.JWT_SECRET) as T;
    }

    async createAccessToken(payload: object): Promise<string> {
        return sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    }

    async createRecoverToken(payload: object): Promise<string> {
        return sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION_RECOVER,
        });
    }

    extractTokenToAuthorizationHeader(): (req: Request) => string {
        function callback(req: Request): string {
            const { authorization } = req.headers;

            if (!authorization)
                throw new UnauthorizedException(
                    'There is no authorization header with a bearer token in the request',
                );

            const [, token] = authorization.split(' ');

            return token;
        }
        return callback;
    }
}
