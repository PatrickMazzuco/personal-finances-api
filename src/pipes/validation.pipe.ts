/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from 'class-validator';

import { ValidationErrors as CustomValidationErrors } from '@errors/validation-errors';
import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export class ClassValidatorPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super(options);
  }

  exceptionFactory = (validationErrors: ValidationError[]): any => {
    if (validationErrors.length > 0) {
      const errors = validationErrors.map(error => {
        return {
          field: error.property,
          errors:
            (error.constraints && Object.values(error.constraints)) ||
            error.children[0].children.map(child =>
              Object.values(child.constraints),
            ),
        };
      });

      throw new CustomValidationErrors(errors);
    }
  };
}
