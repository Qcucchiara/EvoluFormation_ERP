import { Module } from '@nestjs/common';
import { TrainingObjectiveService } from './training_objective.service';
import { TrainingObjectiveController } from './training_objective.controller';

@Module({
  controllers: [TrainingObjectiveController],
  providers: [TrainingObjectiveService],
})
export class TrainingObjectiveModule {}
