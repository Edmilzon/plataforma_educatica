import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RoleEntity } from "./role.entity";

@Entity('role_user')
export class RoleUserEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid_role_user: string;

    @PrimaryColumn()
    uuid_user: string;
    
    @PrimaryColumn()
    uuid_role: string;

    @ManyToOne(() => UserEntity, user => user.user_role)
    user: UserEntity;

    @ManyToOne(() => RoleEntity, role => role.user_role)
    role: RoleEntity;
}