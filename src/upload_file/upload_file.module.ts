import { Module } from "@nestjs/common";
import { UploadFileController } from "./upload_file.controller";

@Module({
  controllers: [UploadFileController],
})
export class UploadFileModule {}
