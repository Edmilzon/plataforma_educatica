import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity('course')
export class CourseEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid_course: string;

    @Column({ length: 100 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @ManyToOne(() => UserEntity, { eager: true })
    @JoinColumn({ name: 'creator_uuid' })
    creator: UserEntity;
}