import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Observable } from "rxjs";
import { CatSighting } from "./catSighting.entity";
import { SightingsService } from "./sightings.service";
import { CreateSightingDto } from './dtos/create-sighting.dto';

@Controller('sightings')
export class SightingsController {
	constructor(private sightingsService: SightingsService) {}

	@Get()
	listAllSightings(): Observable<CatSighting[]> {
		return this.sightingsService.listAllSightings();
	}

	@Get('/:id')
	getSighting(@Param('id') id: string): Observable<CatSighting> {
		return this.sightingsService.getSighting(id);
	}

	@Post()
	createSighting(@Body() createSightingDto: CreateSightingDto): Observable<CatSighting> {
		return this.sightingsService.createSighting(createSightingDto); 
	}

	@Put('/:id')
	updateSighting() {
		// TODO, what can users update?
		return;
	}
}