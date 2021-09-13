import {
	IsEnum,
	IsInt,
	IsLatLong,
	IsNotEmpty,
	IsOptional
} from 'class-validator';
import { SightingType } from './../catSighting.entity';

export class CreateSightingDto {
	@IsNotEmpty()
	image: string;

	@IsInt()
	@IsOptional()
	cat?: number;

	@IsLatLong()
	location: string;

	@IsEnum(SightingType)
	type: SightingType;

	@IsNotEmpty()
	description: string;
}