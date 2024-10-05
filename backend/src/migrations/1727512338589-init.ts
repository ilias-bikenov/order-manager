import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727512338589 implements MigrationInterface {
  name = 'Init1727512338589';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" SERIAL NOT NULL, "full_name" text NOT NULL, "price" integer NOT NULL, "prepayment" integer NOT NULL, "passport_series" text NOT NULL, "phone1" text NOT NULL, "phone2" text NOT NULL, "due_date" date NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
