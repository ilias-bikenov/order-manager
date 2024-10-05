import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImages1728041758918 implements MigrationInterface {
  name = 'AddImages1728041758918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" ADD "images" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "images"`);
  }
}
