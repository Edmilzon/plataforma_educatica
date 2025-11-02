import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1716928800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roles = [
      'administrador',
      'profesor que crea el curso',
      'profesor que inicia el curso',
      'alumno',
    ];

    for (const roleName of roles) {
      await queryRunner.query(
        `INSERT INTO "role" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;`,
        [roleName],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "role" WHERE name IN ('administrador', 'profesor que crea el curso', 'profesor que inicia el curso', 'alumno');`,
    );
  }
}