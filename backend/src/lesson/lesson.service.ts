import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessonEntity } from "./entity/lesson.entity";
import { Repository } from "typeorm";
import { TopicEntity } from "src/topic/entity/topic.entity";
import { LessonDto } from "./dto/lesson.dto";

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(LessonEntity)
        private readonly lessonRepository: Repository<LessonEntity>,
        @InjectRepository(TopicEntity)
        private readonly topicRepository: Repository<TopicEntity>,
    ){}

    async createLesson(createLessonDto: LessonDto): Promise<LessonEntity> {
        const {title, order, description, resource_url, topic_uuid} = createLessonDto;

        const topic = await this.topicRepository.findOne({
            where: { uuid_topic: topic_uuid }
        });

        if(!topic) {
            throw new NotFoundException(`Topic con ID ${topic_uuid} no encontrado`);
        }

        const newLesson = this.lessonRepository.create({
            title,
            order,
            description,
            resource_url,
            topic
        });

        return this.lessonRepository.save(newLesson);
    }

    async findLessonsByTopic(topic_uuid: string): Promise<LessonEntity[]> {
        return this.lessonRepository.find({
            where: { topic: { uuid_topic: topic_uuid}},
            order: { order: 'ASC'}
        })
    }
}