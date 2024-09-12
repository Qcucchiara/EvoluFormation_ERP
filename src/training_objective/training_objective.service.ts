import { Injectable } from '@nestjs/common';
import { CreateTrainingObjectiveDto } from './dto/create-training_objective.dto';
import { UpdateTrainingObjectiveDto } from './dto/update-training_objective.dto';

@Injectable()
export class TrainingObjectiveService {
  create(createTrainingObjectiveDto: CreateTrainingObjectiveDto) {
    return 'This action adds a new trainingObjective';
  }

  findAll() {
    return `This action returns all trainingObjective`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trainingObjective`;
  }

  update(id: number, updateTrainingObjectiveDto: UpdateTrainingObjectiveDto) {
    return `This action updates a #${id} trainingObjective`;
  }

  remove(id: number) {
    return `This action removes a #${id} trainingObjective`;
  }
}
