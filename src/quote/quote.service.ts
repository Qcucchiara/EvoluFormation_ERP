import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Quote } from "src/schemas/Quote.schema";
import { CreateQuoteDTO, UpdateQuoteDTO } from "./dto";
import { Response } from "express";

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private quote: Model<Quote & Document>,
  ) {}
  async create(dto: CreateQuoteDTO, res: Response) {
    try {
      const newQuote = new this.quote(dto);
      const data = await newQuote.save();
      return res.status(res.statusCode).json({
        status: res.statusCode,
        success: true,
        message: "Le dossier a été correctement créée",
        data: data,
      });
    } catch (error) {
      console.log("ERROR: " + error.message);
      return res.status(error.status).json({
        status: error.status,
        success: false,
        message: error.message,
        error: { error: "Database connection error" },
      });
    }
  }

  async findAll() {
    return await this.quote.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.quote.findById(id).exec();
    } catch (error) {
      throw new NotFoundException("Not found");
    }
  }

  async update(id: string, dto: UpdateQuoteDTO) {
    try {
      await this.quote.findById(id).exec();
      return await this.quote.findByIdAndUpdate(id, dto).exec();
    } catch (error) {
      throw new NotFoundException("Not found");
    }
  }

  async remove(id: string) {
    const existingQuote = await this.quote.findById(id).exec();
    if (!existingQuote) {
      throw new NotFoundException("Not found");
    }
    return await this.quote.findByIdAndDelete(id).exec();
  }
}
