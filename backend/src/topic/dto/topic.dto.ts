import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  orden: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsUUID()
  course_uuid: string;
}

export class UpdateTopicDto extends PartialType(CreateTopicDto) {}
