import { ConflictException, NotFoundException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';

enum PrismaErrors {
    UniqueConstraint = 'P2002',
    RecordNotFound = 'P2025',
}

export class DatabaseInterceptor extends BaseInterceptor {
    callback(error: any) {
        const { code, meta } = error;

        switch (code) {
            case PrismaErrors.UniqueConstraint:
                throw new ConflictException({
                    statusCode: 409,
                    message: `${meta?.target} is already in use`,
                    error: 'Conflict',
                });

            case PrismaErrors.RecordNotFound:
                throw new NotFoundException({
                    statusCode: 404,
                    message: meta?.cause,
                    error: 'Not Found',
                });

            default:
                throw error;
        }
    }
}
