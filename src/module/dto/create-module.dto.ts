import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumberString()
  @IsNotEmpty()
  duration: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  speciality_bpf_id: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  objective_bpf_id: string;

  @IsString()
  @ValidateIf((e) => !e.training_objective_id)
  training_objective: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  @ValidateIf((e) => !e.training_objective)
  training_objective_id: string;

  @IsUrl()
  @IsString()
  @IsOptional()
  website_link: string;
}
