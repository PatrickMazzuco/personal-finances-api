/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationErrors extends HttpException {
  constructor(errors: any) {
    super(
      { message: 'Error validating input data', errors },
      HttpStatus.BAD_REQUEST,
    );
  }
}
