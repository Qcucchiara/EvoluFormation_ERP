import { Module } from "@nestjs/common";
import { ClientFolderService } from "./client-folder.service";
import { ClientFolderController } from "./client-folder.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientFolder } from "src/schemas/ClientFolder.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClientFolder.name, schema: ClientFolder },
    ]),
  ],
  controllers: [ClientFolderController],
  providers: [ClientFolderService],
})
export class ClientFolderModule {}
