import { Controller } from '@nestjs/common';
import { ObjectiveBpfService } from './objective_bpf.service';

@Controller('objective-bpf')
export class ObjectiveBpfController {
  constructor(private readonly objectiveBpfService: ObjectiveBpfService) {}
}
