import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository }s from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TopicEntity } from './entity/topic.entity';
import { CreateTopicDto } from './dto/topic.dto';
import { CourseEntity } from '../course/entity/course.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
  ) {}

  async createTopic(createTopicDto: CreateTopicDto): Promise<TopicEntity> {
    const { name, orden, course_uuid } = createTopicDto;

    const course = await this.courseRepository.findOne({
      where: { uuid_course: course_uuid },
    });

    if (!course) {
      throw new NotFoundException(`Curso con ID ${course_uuid} no encontrado`);
    }

    const newTopic = this.topicRepository.create({
      name,
      orden,
      course,
    });

    return this.topicRepository.save(newTopic);
  }

  async findTopicsByCourse(course_uuid: string): Promise<TopicEntity[]> {
    return this.topicRepository.find({
      where: { course: { uuid_course: course_uuid } },
      order: { orden: 'ASC' },
    });
  }
}
