import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { createStudentDto, updateStudentDto } from "../dto";

@Controller("student")
export class StudentController {
  constructor(private readonly personService: StudentService) {}

  @Post()
  create(@Body() dto: createStudentDto) {
    return this.personService.create(dto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.personService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: updateStudentDto) {
    return this.personService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.personService.remove(id);
  }
}
