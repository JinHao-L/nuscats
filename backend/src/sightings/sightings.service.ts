import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CatSighting } from './catSighting.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { CreateSightingDto } from './dtos/create-sighting.dto';

@Injectable()
export class SightingsService {
	constructor(
		@InjectRepository(CatSighting)
		private sightingsRepository: Repository<CatSighting>,
	) {}

	listAllSightings(): Observable<CatSighting[]> {
		return from(this.sightingsRepository.find());
	}

	getSighting(id): Observable<CatSighting> {
		return from(this.sightingsRepository.findOne(id));
	}

	createSighting(createSightingDto: CreateSightingDto): Observable<CatSighting> {
		const sighting = this.sightingsRepository.create({
			...createSightingDto,
		});
		return from(this.sightingsRepository.save(sighting));
	}
}