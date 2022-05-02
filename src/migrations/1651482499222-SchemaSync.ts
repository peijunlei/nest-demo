import {MigrationInterface, QueryRunner} from "typeorm";

export class SchemaSync1651482499222 implements MigrationInterface {
    name = 'SchemaSync1651482499222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" ADD "desc" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "desc"`);
    }

}
