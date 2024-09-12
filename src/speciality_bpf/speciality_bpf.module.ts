import { Module } from '@nestjs/common';
import { SpecialityBpfService } from './speciality_bpf.service';
import { SpecialityBpfController } from './speciality_bpf.controller';

@Module({
  controllers: [SpecialityBpfController],
  providers: [SpecialityBpfService],
})
export class SpecialityBpfModule {}
