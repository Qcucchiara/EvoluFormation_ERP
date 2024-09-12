import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrainingObjectiveService } from './training_objective.service';
import { CreateTrainingObjectiveDto } from './dto/create-training_objective.dto';
import { UpdateTrainingObjectiveDto } from './dto/update-training_objective.dto';

@Controller('training-objective')
export class TrainingObjectiveController {
  constructor(private readonly trainingObjectiveService: TrainingObjectiveService) {}

  @Post()
  create(@Body() createTrainingObjectiveDto: CreateTrainingObjectiveDto) {
    return this.trainingObjectiveService.create(createTrainingObjectiveDto);
  }

  @Get()
  findAll() {
    return this.trainingObjectiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingObjectiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingObjectiveDto: UpdateTrainingObjectiveDto) {
    return this.trainingObjectiveService.update(+id, updateTrainingObjectiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingObjectiveService.remove(+id);
  }
}
