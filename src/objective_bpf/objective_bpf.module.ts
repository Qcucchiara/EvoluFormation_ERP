import { Module } from '@nestjs/common';
import { ObjectiveBpfService } from './objective_bpf.service';
import { ObjectiveBpfController } from './objective_bpf.controller';

@Module({
  controllers: [ObjectiveBpfController],
  providers: [ObjectiveBpfService],
})
export class ObjectiveBpfModule {}
