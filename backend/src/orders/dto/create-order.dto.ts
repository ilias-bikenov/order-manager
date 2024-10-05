import { Transform } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  fullName: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  price: number;

  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  prepayment: number;

  @IsString()
  passportSeries: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dueDate: Date;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  phone1: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsString()
  @IsOptional()
  phone2: string;
}
