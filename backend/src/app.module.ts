import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivresModule } from './livres/livres.module';
import { AuteursModule } from './auteurs/auteurs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'library.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    LivresModule,
    AuteursModule,
  ],
})
export class AppModule {}
