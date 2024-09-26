import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Response } from "express";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto, @Res() res: Response) {
    return this.companyService.create(createCompanyDto, res);
  }

  @Get()
  findAll(@Res() res: Response) {
    return this.companyService.findAll(res);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Res() res: Response) {
    return this.companyService.findOne(id, res);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Res() res: Response,
  ) {
    return this.companyService.update(id, updateCompanyDto, res);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() res: Response) {
    return this.companyService.remove(id, res);
  }
}
