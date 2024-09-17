import { Module } from "@nestjs/common";
import { MongooseService } from "./mongoose.service";
import { MongooseController } from "./mongoose.controller";

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [MongooseController],
  providers: [MongooseService],
})
export class MongooseModule {}
