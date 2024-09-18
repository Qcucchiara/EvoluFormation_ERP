import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  ValidateIf,
} from "class-validator";

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsNumber()
  @IsOptional()
  duration: number;

  @IsUUID()
  @IsOptional()
  speciality_bpf_id: string;

  @IsUUID()
  @IsOptional()
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
