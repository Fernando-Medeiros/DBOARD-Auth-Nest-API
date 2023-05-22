import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';

export function notFoundInterceptor(error) {
    if (error instanceof NotFoundError) throw new NotFoundException(error.message);

    throw error;
}
