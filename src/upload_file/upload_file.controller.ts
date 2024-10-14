import {
  Controller,
  ForbiddenException,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";
import * as fs from "fs";

@Controller("upload-file")
export class UploadFileController {
  constructor() {}

  @Post("/:directory")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const directory = req.params.directory;
          if (!directory || directory === "") {
            return callback(new Error("Le Chemin est requis"), null);
          }
          const destinationPath = `src/uploads/${directory}`;
          if (!fs.existsSync(destinationPath)) {
            fs.mkdirSync(destinationPath);
          }
          return callback(null, destinationPath);
        },
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Param("directory") directory: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new ForbiddenException("File missing");
    }
    return file.filename;
  }
}
