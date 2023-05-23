import { NotFoundException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import NotFoundError from '../types/NotFoundError';

export class NotFoundInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof NotFoundError) {
            throw new NotFoundException(error.message);
        }
        throw error;
    }
}
