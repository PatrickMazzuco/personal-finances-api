import { ForbiddenException, Logger, NotFoundException } from '@nestjs/common';

export namespace TransactionErrors {
  export class NotFound extends NotFoundException {
    constructor(logger: Logger) {
      const message = 'Transaction not found';
      logger.error(message);

      super(message);
    }
  }

  export class Forbidden extends ForbiddenException {
    constructor(logger: Logger) {
      const message = 'No permission to perform this action';
      logger.error(message);

      super(message);
    }
  }
}
