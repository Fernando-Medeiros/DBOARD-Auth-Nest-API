import { BadRequestException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import DatabaseError from 'errors/DatabaseError';

export class DatabaseInterceptor extends BaseInterceptor {
    callback(error: any) {
        if (error instanceof DatabaseError) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
}
