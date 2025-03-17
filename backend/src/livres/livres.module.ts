import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreRepository } from 'src/livres/repositories/livre.repository';
import { LivresController } from './livres.controller';
import { LivresService } from './livres.service';
import { Livre } from 'src/livres/entities/livre/livre';

@Module({
  imports: [TypeOrmModule.forFeature([Livre])],
  controllers: [LivresController],
  providers: [LivresService, LivreRepository],
  exports: [LivresService, LivreRepository],
})
export class LivresModule {}
