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
        modules: [
          {
            moduleId: string;
            sessions: [
              {
                convocation: {
                  place: string;
                  days: [
                    {
                      periods: [
                        {
                          signatureSheet: {
                            fileName: string;
                            filePath: string;
                          };
                          trainees: [
                            {
                              traineeData: unknown;
                              trainingCertificate: {
                                fileName: string;
                                filePath: string;
                              };
                              skillsAssessment: {
                                fileName: string;
                                filePath: string;
                              };
                              placementTest: {
                                fileName: string;
                                filePath: string;
                              };
                              hotEvaluation: {
                                fileName: string;
                                filePath: string;
                              };
                            },
                          ];
                        },
                      ];
                      date: string;
                      duration: number;
                    },
                  ];
                };
                trainers: [
                  {
                    trainerId: string;
                    trainerContract: {
                      fileName: string;
                      filePath: string;
                    };
                    trainerOpinion: string;
                  },
                ];
              },
            ];
            duration;
          },
        ];
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
