import { MigrationInterface, QueryRunner } from "typeorm";
/**每一条都是一个 迁移 指令 */
export class CoffeeRefactor1651481642871 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        )
    }

}
