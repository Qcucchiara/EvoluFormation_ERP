import { Prop, Schema } from "@nestjs/mongoose";
import { DocumentInFolder, DocumentInFolderSchema } from "./DocumentInFolder.schema";

@Schema()
export class Trainee{
    @Prop()
    traineeId: string;

    @Prop({type: DocumentInFolderSchema})
    trainingCertificate: DocumentInFolder;

    @Prop({type:DocumentInFolderSchema})
    skillsAssessment: DocumentInFolder;
    
    @Prop({type: DocumentInFolderSchema})
    placementTest: DocumentInFolder;

    @Prop({type: DocumentInFolderSchema})
    hotEvaluation: DocumentInFolder;
}
