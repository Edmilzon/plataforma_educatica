import { Controller, Post, Body, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicService.createTopic(createTopicDto);
  }

  @Get('course/:course_uuid')
  findByCourse(
    @Param('course_uuid', new ParseUUIDPipe()) course_uuid: string,
  ) {
    return this.topicService.findTopicsByCourse(course_uuid);
  }
}