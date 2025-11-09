import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class LessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    order: number;


    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    resource_url: string;

    @IsUUID()
    topic_uuid: string;

}