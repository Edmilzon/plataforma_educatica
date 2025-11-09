import { Body, Controller, Post } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { LessonDto } from "./dto/lesson.dto";

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService){}

    @Post()
    create(@Body() lessonDto: LessonDto) {
        return this.lessonService.createLesson(lessonDto);
    }
}