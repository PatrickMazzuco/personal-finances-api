import { Logger, NotFoundException } from '@nestjs/common';

export namespace TransactionErrors {
  export class UserNotFound extends NotFoundException {
    constructor(logger: Logger) {
      const message = 'User not found';
      logger.error(message);

      super(message);
    }
  }

  export class NotFound extends NotFoundException {
    constructor(logger: Logger) {
      const message = 'Transaction not found';
      logger.error(message);

      super(message);
    }
  }
}
