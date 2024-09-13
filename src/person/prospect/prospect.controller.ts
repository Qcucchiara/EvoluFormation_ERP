import { Controller, Post } from "@nestjs/common";
import { ProspectService } from "./prospect.service";

@Controller("prospect")
export class prospectController {
  constructor(private readonly prospectService: ProspectService) {}

  @Post()
  create(Body()  ){}
}
