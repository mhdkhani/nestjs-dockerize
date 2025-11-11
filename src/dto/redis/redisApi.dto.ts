import {
    ArrayMinSize,
    ArrayNotEmpty,
    IsArray, IsBoolean,
    IsDateString,
    IsEnum,
    IsInt, IsNotEmpty, IsString,IsNumber
} from "class-validator";
import {Transform, Type} from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class redisApiGetDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    redis_key: string
}

export class redisApiSetDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    redis_key: string

    @ApiProperty()
    @IsNotEmpty()
    body: any

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    ex: number
}
