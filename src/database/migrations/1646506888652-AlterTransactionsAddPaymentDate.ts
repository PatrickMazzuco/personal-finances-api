import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTransactionsAddPaymentDate1646506888652
  implements MigrationInterface
{
  name = 'AlterTransactionsAddPaymentDate1646506888652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "payment" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "paid" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "paid"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "payment"`);
  }
}
