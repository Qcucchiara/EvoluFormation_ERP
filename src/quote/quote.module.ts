import { Module } from "@nestjs/common";
import { QuoteService } from "./quote.service";
import { QuoteController } from "./quote.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Quote, QuoteSchema } from "src/schemas/Quote.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
