import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { LessonDto } from "./dto/lesson.dto";

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService){}

    @Post()
    create(@Body() lessonDto: LessonDto) {
        return this.lessonService.createLesson(lessonDto);
    }

    @Get('topic/:topic_uuid')
    findByTopic(
        @Param('topic_uuid', new ParseUUIDPipe()) topic_uuid: string,
    ){
        return this.lessonService.findLessonsByTopic(topic_uuid);
    }
}