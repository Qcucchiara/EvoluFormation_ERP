import { Module } from "@nestjs/common";
import { MongooseService } from "./mongoose.service";
import { MongooseController } from "./mongoose.controller";

@Module({
  controllers: [MongooseController],
  providers: [MongooseService],
})
export class MongooseModule {}
