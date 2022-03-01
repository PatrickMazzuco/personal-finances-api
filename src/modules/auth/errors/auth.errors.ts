import { BadRequestException, Logger } from '@nestjs/common';

export namespace AuthErrors {
  export class InvalidCredentials extends BadRequestException {
    constructor(logger: Logger) {
      const message = 'Email or password is invalid';
      logger.error(message);

      super(message);
    }
  }
}
