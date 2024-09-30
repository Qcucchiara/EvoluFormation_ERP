// export type Quote = {
//   quoteFile: DocumentInFolder;
//   trainingAgreement: {
//     fundingType:
//       | "OPCO"
//       | "CPF"
//       | "Entreprise"
//       | "Perso"
//       | "Pole Emploi"
//       | "Pouvoir Publique";
//     clientId: string;
//     modules: Module[];
//     invoice: DocumentInFolder;
//   };
//   price: number;
//   needAnalysis: string;
// };

import { Prop, Schema } from "@nestjs/mongoose";
import {
  DocumentInFolder,
  FundingType,
  Module,
} from "src/utils/noSQLSchema/FolderType";

@Schema()
export class Quote {
  @Prop()
  quoteFile: DocumentInFolder;

  @Prop()
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
