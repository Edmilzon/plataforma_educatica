import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import { CourseEntity } from '../../course/entity/course.entity';
import { LessonEntity } from 'src/lesson/entity/lesson.entity';

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

    @OneToMany(() => LessonEntity, (lesson) => lesson.topic, {cascade: true})
    lessons: LessonEntity[];
}