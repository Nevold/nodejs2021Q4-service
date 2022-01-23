import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migration1642612753988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'login',
            type: 'text',
          },
          {
            name: 'password',
            type: 'text',
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'board',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'text',
          },
          {
            name: 'columns',
            type: 'json',
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: 'task',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'text',
          },
          {
            name: 'order',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'userId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'boardId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'columnId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true
    );
    await queryRunner.query(
      `INSERT INTO "user" (name,login,password) VALUES ('admin','admin','$2a$05$GwyNXy4f7FuuwO981QGu5ONrKxlpo9OZYFKaLLkqQXLwGRa0sdzei')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('board');
    await queryRunner.dropTable('task');
  }
}
