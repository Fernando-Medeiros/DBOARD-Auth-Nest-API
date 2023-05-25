import { UnauthorizedException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import UnauthorizedError from 'errors/UnauthorizedError';

export class UnauthorizedInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof UnauthorizedError) {
            throw new UnauthorizedException(
                'Unauthorized access, check credentials or login again',
            );
        }
        throw error;
    }
}
