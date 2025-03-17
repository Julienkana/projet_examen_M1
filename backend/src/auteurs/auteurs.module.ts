import { Module } from '@nestjs/common';
import { AuteursController } from './auteurs.controller';
import { AuteursService } from './auteurs.service';

@Module({
  controllers: [AuteursController],
  providers: [AuteursService]
})
export class AuteursModule {}
