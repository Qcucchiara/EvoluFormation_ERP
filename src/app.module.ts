import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { RoleModule } from './role/role.module';
import { CompanyModule } from './company/company.module';
import { CommentModule } from './comment/comment.module';
import { CommentCategoryModule } from './comment_category/comment_category.module';
import { ResourceModule } from './resource/resource.module';
import { ModuleModule } from './module/module.module';
import { SpecialityBpfModule } from './speciality_bpf/speciality_bpf.module';
import { ObjectiveBpfModule } from './objective_bpf/objective_bpf.module';
import { TrainingObjectiveModule } from './training_objective/training_objective.module';

@Module({
  imports: [PersonModule, RoleModule, CompanyModule, CommentModule, CommentCategoryModule, ResourceModule, ModuleModule, SpecialityBpfModule, ObjectiveBpfModule, TrainingObjectiveModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
