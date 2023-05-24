import { UnauthorizedException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import { JsonWebTokenError } from 'jsonwebtoken';

export class JsonWebTokenInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof JsonWebTokenError) {
            throw new UnauthorizedException('token with invalid or expired signature');
        }
        throw error;
    }
}
