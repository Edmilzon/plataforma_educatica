import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  orden: number;

  @IsUUID()
  course_uuid: string;
}
