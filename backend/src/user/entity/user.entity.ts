import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid_user: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ length: 100, nullable: true })
  password: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 50, default: 'student' })
  role: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ type: 'varchar', nullable: true })
  confirmationToken: string | null;
}
