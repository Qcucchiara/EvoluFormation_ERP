import { PartialType } from '@nestjs/mapped-types';
import { CreateClientFolderDto } from './create-client-folder.dto';

export class UpdateClientFolderDto extends PartialType(CreateClientFolderDto) {}
