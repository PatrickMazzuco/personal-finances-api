import { TestingModule } from '@nestjs/testing';
import { PrismaService } from '@src/prisma.service';

export class DatabaseTestHelper {
  private prisma: PrismaService;

  constructor(private readonly module: TestingModule) {
    this.prisma = module.get<PrismaService>(PrismaService);
  }

  async clearDatabase(): Promise<void> {
    const deleteUsers = this.prisma.user.deleteMany();

    await this.prisma.$transaction([deleteUsers]);
  }
}
