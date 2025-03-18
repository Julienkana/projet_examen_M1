import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivresController } from './livres.controller';
import { LivresService } from './livres.service';
import { Livre } from 'src/livres/entities/livre/livre';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';
import { AuteursService } from 'src/auteurs/auteurs.service';
import { AuteursModule } from 'src/auteurs/auteurs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Livre, Auteur]), AuteursModule],
  controllers: [LivresController],
  providers: [LivresService, AuteursService],
  exports: [LivresService],
})
export class LivresModule {}
