import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecurringTransactions1647565803939
  implements MigrationInterface
{
  name = 'CreateRecurringTransactions1647565803939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."recurring_transactions_type_enum" AS ENUM('INCOME', 'EXPENSE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "recurring_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "type" "public"."recurring_transactions_type_enum" NOT NULL, "amount" numeric NOT NULL, "description" character varying NOT NULL, "payment_day" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6485db3243762a54992dc0ce3b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "recurring_transactions" ADD CONSTRAINT "FK_d78f3002f99b0f15a3797201c92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recurring_transactions" DROP CONSTRAINT "FK_d78f3002f99b0f15a3797201c92"`,
    );
    await queryRunner.query(`DROP TABLE "recurring_transactions"`);
    await queryRunner.query(
      `DROP TYPE "public"."recurring_transactions_type_enum"`,
    );
  }
}
