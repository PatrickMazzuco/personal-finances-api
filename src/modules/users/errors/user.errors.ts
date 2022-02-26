import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';

export namespace UserErrors {
  export class NotFound extends NotFoundException {
    constructor(logger: Logger) {
      const message = 'User not found';
      logger.error(message);

      super(message);
    }
  }

  export class DuplicatedEmail extends BadRequestException {
    constructor(logger: Logger) {
      const message = 'The email is already in use';
      logger.error(message);

      super(message);
    }
  }
}
