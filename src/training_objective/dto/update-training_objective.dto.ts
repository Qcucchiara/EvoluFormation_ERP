import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingObjectiveDto } from './create-training_objective.dto';

export class UpdateTrainingObjectiveDto extends PartialType(CreateTrainingObjectiveDto) {}
