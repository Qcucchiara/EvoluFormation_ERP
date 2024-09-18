import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ClientFolderType = HydratedDocument<clientFolder>;

export type QuoteType = HydratedDocument<quote>;

export type TrainingAgreementType = HydratedDocument<trainingAgreement>;

export type ClientType = HydratedDocument<client>;
export enum FundingType {
  OPCO = "OPCO",
  CPF = "CPF",
  entreprise = "entreprise",
  perso = "perso",
  poleEmploi = "poleEmploi",
  pouvoirPublique = "pouvoirPublique",
}

@Schema()
export class clientFolder {
  @Prop()
  quotes: quote[];

  @Prop()
  companyId: string;
}

@Schema()
export class quote {
  @Prop()
  trainingAgreement: trainingAgreement;

  @Prop()
  price: number;

  @Prop()
  needAnalysis: string;
}

@Schema()
export class trainingAgreement {
  @Prop()
  fundingType: FundingType;

  @Prop()
  client: client;

  @Prop()
  modules: any;

  @Prop()
  invoice: unknown;
}

@Schema()
export class client {
  @Prop()
  clientId: string;
}

@Schema()
export class module {
  @Prop()
  sessions: session[];
}

@Schema()
export class session {
  @Prop()
  convocation;
}

export const ClientFolderSchema = SchemaFactory.createForClass(clientFolder);
export const QuoteSchema = SchemaFactory.createForClass(quote);
