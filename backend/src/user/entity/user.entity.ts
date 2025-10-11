import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  uuid_user: string;

  @Column({ unique: true, length: 50 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  lastname: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ length: 50, default: 'usuario' })
  rol: string;
}
