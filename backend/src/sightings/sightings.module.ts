import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatSighting } from "./catSighting.entity";
import { SightingsController } from "./sightings.controller";
import { SightingsService } from "./sightings.service";

@Module({
	imports: [TypeOrmModule.forFeature([CatSighting])],
	controllers: [SightingsController],
	providers: [SightingsService],
})
export class SightingsModule {}