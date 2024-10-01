import { Injectable } from "@nestjs/common";
import { CreateClientFolderDto } from "./dto/create-client-folder.dto";
import { UpdateClientFolderDto } from "./dto/update-client-folder.dto";
import { InjectModel } from "@nestjs/mongoose";
import { ClientFolder } from "src/schemas/ClientFolder.schema";
import { Document, Model } from "mongoose";

@Injectable()
export class ClientFolderService {
  constructor(
    @InjectModel(ClientFolder.name)
    private clientFolder: Model<ClientFolder & Document>,
  ) {}

  async create(createClientFolderDto: CreateClientFolderDto) {
    const newFolder = new this.clientFolder();
    console.log(newFolder);
    return newFolder.save();
  }

  findAll() {
    return this.clientFolder.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} clientFolder`;
  }

  update(id: number, updateClientFolderDto: UpdateClientFolderDto) {
    return `This action updates a #${id} clientFolder`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientFolder`;
  }
}
