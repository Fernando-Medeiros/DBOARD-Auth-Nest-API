import { UnauthorizedException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import UnauthorizedError from 'errors/UnauthorizedError';

export class UnauthorizedInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof UnauthorizedError) {
            throw new UnauthorizedException(error.message);
        }
        throw error;
    }
}
