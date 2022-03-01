import { ITransactionsRepository } from '@modules/transactions/repositories/transactions-repository.interface';
import { IUsersRepository } from '@modules/users/repositories/users-repository.interface';
import { TestingModule } from '@nestjs/testing';
import { RepositoryToken } from '@src/shared/enums/repository-token.enum';

export class DatabaseTestHelper {
  private usersRepository: IUsersRepository;
  private transactionsRepository: ITransactionsRepository;
  constructor(private readonly module: TestingModule) {
    this.usersRepository = module.get<IUsersRepository>(
      RepositoryToken.USERS_REPOSITORY,
    );

    this.transactionsRepository = module.get<ITransactionsRepository>(
      RepositoryToken.TRANSACTIONS_REPOSITORY,
    );
  }

  async clearDatabase(): Promise<void> {
    await this.transactionsRepository.truncateTable();
    await this.usersRepository.truncateTable();
  }
}
