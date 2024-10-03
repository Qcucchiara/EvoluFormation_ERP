export type ClientFolder = {
  companyId: string;
  quotes: Quote[];
  sessions: Session[];
  pastTrainers: Trainer[];
  pastTrainees: Trainee[];
};

export type Quote = {
  quoteFile: DocumentInFolder;
  trainingAgreement: {
    fundingType: FundingType;
    clientId: string;
    modules: Module[];
    invoice: DocumentInFolder;
  };
  price: number;
  needAnalysis: string;
};

export type DocumentInFolder = {
  fileName: string;
  filePath: string;
};

// TODO: renommer Module par autre chose vu que Module est un nom beaucoup utilisé.
export type Module = {
  moduleId: string;
  duration: string; // format de date bizarre fait manuellement par l'utilisateur
  sessions: Session[];
};

export type Session = {
  place: string;
  date: string;
  duration: number;
  signatureSheet: DocumentInFolder; // Moved signatureSheet up to session level.
  trainees: Trainee[];
  trainers: Trainer[];
  periods: [
    {
      date: string;
      hours: {
        start: number;
        end: number;
      };
      periodsInfo: string;
    },
  ];
};

export type Trainer = {
  trainerId: string;
  contract: DocumentInFolder;
  opinion: string;
};

export type Trainee = {
  traineeId: string;
  trainingCertificate: DocumentInFolder;
  skillsAssessment: DocumentInFolder;
  placementTest: DocumentInFolder;
  hotEvaluation: DocumentInFolder;
};

export enum FundingType {
  "OPCO",
  "CPF",
  "Entreprise",
  "Perso",
  "Pole Emploi",
  "Pouvoir Publique",
}
