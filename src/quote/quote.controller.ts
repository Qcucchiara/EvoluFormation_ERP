import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from "@nestjs/common";
import { QuoteService } from "./quote.service";
import { CreateQuoteDTO, UpdateQuoteDTO } from "./dto";
import { Response } from "express";

@Controller("quote")
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}
  @Post()
  create(@Body() dto: CreateQuoteDTO, @Res() res: Response) {
    return this.quoteService.create(dto, res);
  }

  @Get()
  findAll() {
    return this.quoteService.findAll();
  }

  @Get("/:id")
  findOne(@Param("id") id: string) {
    return this.quoteService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateQuoteDTO) {
    return this.quoteService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.quoteService.remove(id);
  }
}
