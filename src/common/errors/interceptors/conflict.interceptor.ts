import { ConflictException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import ConflictError from 'errors/ConflictError';

export class ConflictInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof ConflictError) {
            throw new ConflictException(error.message);
        }
        throw error;
    }
}
