import { Controller } from '@nestjs/common';
import { MongooseService } from './mongoose.service';

@Controller('mongoose')
export class MongooseController {
  constructor(private readonly mongooseService: MongooseService) {}
}
