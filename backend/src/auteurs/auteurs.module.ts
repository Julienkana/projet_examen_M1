import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuteursController } from './auteurs.controller';
import { AuteursService } from './auteurs.service';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';
import { AuteurRepository } from 'src/auteurs/repositories/auteur.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Auteur])],
  controllers: [AuteursController],
  providers: [AuteursService, AuteurRepository],
  exports: [AuteursService, AuteurRepository],
})
export class AuteursModule {}

