import { Module } from '@nestjs/common';
import { RessourceTypeService } from './ressource_type.service';
import { RessourceTypeController } from './ressource_type.controller';

@Module({
  controllers: [RessourceTypeController],
  providers: [RessourceTypeService],
})
export class RessourceTypeModule {}
