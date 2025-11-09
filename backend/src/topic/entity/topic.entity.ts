import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { CourseEntity } from '../../course/entity/course.entity';

@Entity('topic')
export class TopicEntity {
    @PrimaryGeneratedColumn('uuid')
    uuid_topic: string;

    @Column({ length: 100 })
    name: string;

    @Column({ type: 'int' })
    orden: number;

    @ManyToOne(() => CourseEntity, (course) => course.topics, {
        onDelete: 'CASCADE',
        eager: false,
    })
    @JoinColumn({ name: 'course_uuid' })
    course: CourseEntity;
}