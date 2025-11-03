import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedRoles1716928800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const roles = [
    //   'administrador',
    //   'profesor que crea el curso',
    //   'profesor que inicia el curso',
    //   'alumno',
    // ];
    //
    // for (const roleName of roles) {
    //   await queryRunner.query(
    //     `INSERT INTO "role" (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;`,
    //     [roleName],
    //   );
    // }

    // Crear un usuario administrador
    const adminEmail = 'admin@gmail.com'; 
    const adminExists = await queryRunner.query(
      `SELECT 1 FROM "user" WHERE email = $1`,
      [adminEmail],
    );

    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash('1234567890', 10);
      const adminUserResult = await queryRunner.query(
        `INSERT INTO "user" (email, password, name, lastname, "isConfirmed") VALUES ($1, $2, $3, $4, $5) RETURNING uuid_user;`,
        [adminEmail, hashedPassword, 'Admin', 'User', true],
      );
      const adminUserId = adminUserResult[0].uuid_user;

      const adminRoleResult = await queryRunner.query(
        `SELECT uuid_role FROM "role" WHERE name = 'administrador';`,
      );
      const adminRoleId = adminRoleResult[0].uuid_role;

      await queryRunner.query(
        `INSERT INTO "role_user" (uuid_user, uuid_role) VALUES ($1, $2);`,
        [adminUserId, adminRoleId],
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "role_user" WHERE uuid_user IN (SELECT uuid_user FROM "user" WHERE email = 'admin@gmail.com');`,
    );
    await queryRunner.query(`DELETE FROM "user" WHERE email = 'admin@gmail.com';`);
  }
}