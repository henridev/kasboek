export enum ChequeEnum {
  payfair = "payfair",
  sodexo = "sodexo",
  "accor_/_edenred" = "accor_/_edenred",
}

export enum ChequeSubCategorieEnum {
  "e-maaltijd" = "e-maaltijd",
  "e-eco" = "e-eco",
  "e-cadeau" = "e-cadeau",
}

export type Cheques = {
  [key in ChequeEnum]: {[key in ChequeSubCategorieEnum]: number};
};

export const newCheque = (): Cheques =>  ({
   payfair: {
    "e-maaltijd": 0,
    "e-eco": 0,
    "e-cadeau": 0
   },
   sodexo: {
    "e-maaltijd": 0,
    "e-eco": 0,
    "e-cadeau": 0
   },
   "accor_/_edenred": {
    "e-maaltijd": 0,
    "e-eco": 0,
    "e-cadeau": 0
   }
})