/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationErrors } from '@errors/validation-errors';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let status;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      if (exception instanceof ValidationErrors) {
        const exceptionResponse: any = exception.getResponse();

        return response.status(status).json(exceptionResponse);
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      process.env.NODE_ENV !== 'test' && console.log(exception);
    }

    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !['sandbox', 'production', 'test'].includes(process.env.NODE_ENV)
    ) {
      return response.status(status).json({
        message: exception.message,
        stack: exception.stack,
      });
    }

    return response.status(status).json({
      message:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Internal Server Error'
          : exception.message,
    });
  }
}
