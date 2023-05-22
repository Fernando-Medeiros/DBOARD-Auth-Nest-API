import { BadRequestException } from '@nestjs/common';
import BadRequestError from '../types/BadRequestError';

export function badRequestInterceptor(error) {
    if (error instanceof BadRequestError) throw new BadRequestException(error.message);

    throw error;
}
