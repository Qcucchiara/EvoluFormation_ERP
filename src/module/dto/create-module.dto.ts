import {
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsUUID()
  @IsNotEmpty()
  speciality_bpf_id: string;

  @IsUUID()
  @IsNotEmpty()
  objective_bpf_id: string;

  @IsString()
  @ValidateIf((e) => !e.training_objective_id)
  training_objective: string;

  @IsUUID()
  @ValidateIf((e) => !e.training_objective)
  training_objective_id: string;

  @IsUrl()
  @IsOptional()
  website_link: string;
}
