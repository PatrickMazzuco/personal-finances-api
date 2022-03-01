import { Request } from 'express';

import { User } from '@modules/users/entities/user';

export type AuthenticatedRequest = Request & {
  user: User;
};
