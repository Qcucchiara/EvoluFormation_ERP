// type AIClientFolder = {
//   companyId: string;
//   quotes: [
//     {
//       fileName: string;
//       filePath: string;
//       trainingAgreement: {
//         fundingType:
//           | "OPCO"
//           | "CPF"
//           | "Entreprise"
//           | "Perso"
//           | "Pole Emploi"
//           | "Pouvoir Publique";
//         clientId: string;
//         modules: [
//           {
//             moduleId: string;
//             duration: string; // format de date bizarre fait manuellement par l'utilisateur
//             sessions: [
//               {
//                 place: string;
//                 date: string;
//                 duration: number;
//                 signatureSheet: DocumentInFolder; // Moved signatureSheet up to session level.
//                 trainees: [
//                   {
//                     traineeData: unknown;
//                     trainingCertificate: DocumentInFolder;
//                     skillsAssessment: DocumentInFolder;
//                     placementTest: DocumentInFolder;
//                     hotEvaluation: DocumentInFolder;
//                   },
//                 ];
//                 trainers: [
//                   {
//                     trainerId: string;
//                     contract: DocumentInFolder;
//                     opinion: string;
//                   },
//                 ];
//                 periods: [
//                   {
//                     date: string;
//                     hours: {
//                       start: number;
//                       end: number;
//                     };
//                     periodsInfo: string;
//                   },
//                 ];
//               },
//             ];
//           },
//         ];
//         invoice: DocumentInFolder;
//       };
//       price: number;
//       needAnalysis: string;
//     },
//   ];
// };

// type DocumentInFolder = {
//   fileName: string;
//   filePath: string;
// };
