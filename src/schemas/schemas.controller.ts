import { Controller } from '@nestjs/common';
import { SchemasService } from './schemas.service';

@Controller('schemas')
export class SchemasController {
  constructor(private readonly schemasService: SchemasService) {}
}
