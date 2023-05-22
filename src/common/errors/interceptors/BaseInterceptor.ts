import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

@Injectable()
export default class implements NestInterceptor {
    constructor(public callback: CallableFunction) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(catchError(err => this.callback(err)));
    }
}
