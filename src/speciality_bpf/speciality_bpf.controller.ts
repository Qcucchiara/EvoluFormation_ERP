import { Controller } from '@nestjs/common';
import { SpecialityBpfService } from './speciality_bpf.service';

@Controller('speciality-bpf')
export class SpecialityBpfController {
  constructor(private readonly specialityBpfService: SpecialityBpfService) {}
}
