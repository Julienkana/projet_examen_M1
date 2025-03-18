import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Livre } from 'src/livres/entities/livre/livre';
import { Auteur } from 'src/auteurs/entities/auteur/auteur';
import { LivresModule } from './livres/livres.module';
import { AuteursModule } from './auteurs/auteurs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Livre, Auteur], // Ajout direct des entités
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Livre, Auteur]),
    LivresModule,
    AuteursModule,
  ],
})
export class AppModule {}
