import { Cards, CardsEnum, newCards } from "../models/Cards";
import { genKey } from "../utils";
import type { Sheet } from "xlsx/types";
import {
  ChequeEnum,
  ChequeSubCategorieEnum,
  newCheque,
  newSales,
  SalesEnum,
  Sales,
  Cheques,
} from "../models";

export const createRowForDataOnlyXLS = (
  sheet: Sheet
): [Sales, Cards, Cheques] => {
  console.log(sheet);
  let cardRow: number = 29;
  const verkoopCijfers: [string, number, number] = ["C", 3, 29];
  const verkoopCijfersTitelColumn: string = "A";
  const sales = newSales();

  while (verkoopCijfers[1] < verkoopCijfers[2]) {
    const keyForVal = `${verkoopCijfers[0]}${verkoopCijfers[1]}`;
    const keyForTitel = `${verkoopCijfersTitelColumn}${verkoopCijfers[1]}`;
    const val = sheet[keyForVal]?.v;
    const titel = sheet[keyForTitel]?.v;
    verkoopCijfers[1]++;
    const key = genKey(titel);
    if (key in SalesEnum) {
      sales[key] = val;
      console.log('key', key)
      if (key === "superplus") {
        cardRow = 30;
      }
    }
  }

  const cells = Object.entries(sheet)
    .filter(([key]) => key.includes(cardRow.toString()))
    .map(([, val]) =>
      typeof val?.v === "string" ? genKey(val?.v) : val?.v
    );

  const cards = newCards();
  const cheques = newCheque();
  let currentCheque = "";

  cells.forEach((cell, i) => {
    if (cell in CardsEnum) {
      cards[cell] = cells[i + 2];
    } else if (cell in ChequeEnum) {
      currentCheque = cell;
    }
    if (currentCheque) {
      if (cell in ChequeSubCategorieEnum) {
        cheques[currentCheque][cell] = cells[i + 2];
      }
    }
  });
  console.log("cheques", cheques);
  console.log("sales", sales);
  console.log("cards", cards);
  return [sales, cards, cheques];
};

export const createRowForCompleyXLS = (
  sheet: Sheet
): [Sales, Cards, Cheques] => {
  const sales = newSales();
  sales.totaal = sheet?.Q62?.v;
  sales.cheque_delhaize = sheet?.R17?.v;
  sales.tegoedbon_crea = sheet?.R60?.v;
  sales.publiciteitsbon = sheet?.R25?.v;
  sales.bon_pub_dll = sheet?.R21?.v;
  sales.bon_pub_lev = sheet?.R23?.v;
  sales.bon_pub_lev = sheet?.R23?.v;
  sales.leeggoedbon = sheet?.R27?.v;
  sales.bancontact = sheet?.R35?.v;
  sales.op_krediet = sheet?.R43?.v;
  sales.cheq_spec = sheet?.R13?.v;
  sales.tegoedbon = sheet?.R19?.v;
  sales.ecocheques = sheet?.R29?.v;
  sales.terugbet_lotto = sheet?.R39?.v;
  sales.maaltijdcheque = sheet?.R13?.v;

  const cards = newCards();
  cards.amex = sheet?.AF68?.v;
  cards.visa = sheet?.AF70?.v;
  cards.mastercard = sheet?.AF72?.v;
  cards.maestro = sheet?.AF74?.v;
  cards.visa_electron = sheet?.AF76?.v;

  const cheques = newCheque();
  cheques.payfair["e-maaltijd"] = sheet?.AF94?.v;
  cheques.payfair["e-eco"] = sheet?.AF97?.v;
  cheques.payfair["e-cadeau"] = sheet?.AF100?.v;
  cheques.sodexo["e-maaltijd"] = sheet?.AF105?.v;
  cheques.sodexo["e-eco"] = sheet?.AF108?.v;
  cheques.sodexo["e-cadeau"] = sheet?.AF111?.v;
  cheques.sodexo["e-maaltijd"] = sheet?.AF117?.v;
  cheques.sodexo["e-eco"] = sheet?.AF120?.v;
  cheques.sodexo["e-cadeau"] = sheet?.AF122?.v;

  console.log("cheques", cheques);
  console.log("sales", sales);
  console.log("cards", cards);
  return [sales, cards, cheques];
};
