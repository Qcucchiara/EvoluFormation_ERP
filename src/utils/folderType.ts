type ClientFolder = {
  companyId: string;
  quotes: [
    {
      fileName: string;
      filePath: string;
      trainingAgreement: {
        fundingType:
          | "OPCO"
          | "CPF"
          | "Entreprise"
          | "Perso"
          | "Pole Emploi"
          | "Pouvoir Publique";
        client: { clientId: string };
        modules: [{ moduleId: string; duration }];
        invoice: {
          fileName: string;
          filePath: string;
        };
      };
      price: number;
      needAnalysis: string;
    },
  ];
};
