import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {
  DocumentInFolder,
  DocumentInFolderSchema,
} from "./DocumentInFolder.schema";
import { Module, ModuleSchema } from "./Module.schema";

enum FundingType {
  "OPCO",
  "CPF",
  "Entreprise",
  "Perso",
  "Pole Emploi",
  "Pouvoir Publique",
}

const FundingENUM = {
  OPCO: "OPCO",
  CPF: "CPF",
  Entreprise: "Entreprise",
  Perso: "Perso",
  Pole_Emploi: "Pole_Emploi",
  Pouvoir_Publique: "Pouvoir_Publique",
};

@Schema()
export class Quote {
  @Prop({ type: DocumentInFolderSchema })
  quoteFile: DocumentInFolder;

  @Prop({
    type: {
      fundingType: { type: String, enum: FundingENUM },
      clientId: String,
      modules: ModuleSchema,
      invoice: DocumentInFolderSchema,
    },
  })
  trainingAgreement: {
    fundingType: FundingType;
    clientId: string;
    modules: Module;
    invoice: DocumentInFolder;
  };

  @Prop()
  Price: number;

  @Prop()
  needAnalysis: string;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
