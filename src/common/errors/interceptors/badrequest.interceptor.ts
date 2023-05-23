import { BadRequestException } from '@nestjs/common';
import BaseInterceptor from './BaseInterceptor';
import BadRequestError from '../types/BadRequestError';

export class BadRequestInterceptor extends BaseInterceptor {
    callback(error) {
        if (error instanceof BadRequestError) {
            throw new BadRequestException(error.message);
        }
        throw error;
    }
}
