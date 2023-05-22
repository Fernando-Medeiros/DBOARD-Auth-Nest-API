import { UnauthorizedException } from '@nestjs/common';
import UnauthorizedError from '../types/UnauthorizedError';

export function unauthorizedInterceptor(error) {
    if (error instanceof UnauthorizedError) throw new UnauthorizedException(error.message);

    throw error;
}
