import { read } from "xlsx";
import { CardsEnum, newCards } from "../models/Cards";
import {
  ChequeEnum,
  ChequeSubCategorieEnum,
  newCheque,
  Row,
  newSales,
  SalesEnum,
} from "../models";
import { convertToIsoStringTwo, genKey } from "../utils";

const cardRow: number = 29;

const convertUploadedCsvToRow = (inputFile): Promise<Row> => {
  const temporaryFileReader = new FileReader();
  const verkoopCijfers: [string, number, number] = ["C", 3, 29];
  const verkoopCijfersTitelColumn: string = "A";

  return new Promise((resolve, reject) => {
    temporaryFileReader.onerror = () => {
      temporaryFileReader.abort();
      reject(new DOMException("Probleem bij verwerking kasboek"));
    };

    temporaryFileReader.onload = (ev: ProgressEvent<FileReader>): any => {
      const {
        target: { result },
      } = ev;
      const data = new Uint8Array(result as ArrayBuffer);
      const workbook = read(data, { type: "array" });
      const sheet = workbook.Sheets.Sheet1;

      const sales = newSales();
      let datum: string = sheet?.A1?.v.match(/\d{2}\/\d{2}\/\d{4}/)[0];
      if(datum){
        datum =  convertToIsoStringTwo(datum)
      }
      

      while (verkoopCijfers[1] < verkoopCijfers[2]) {
        const keyForVal = `${verkoopCijfers[0]}${verkoopCijfers[1]}`;
        const keyForTitel = `${verkoopCijfersTitelColumn}${verkoopCijfers[1]}`;
        const val = sheet[keyForVal]?.v;
        const titel = sheet[keyForTitel]?.v;
        verkoopCijfers[1]++;
        const key = genKey(titel);
        if (key in SalesEnum) {
          sales[key] = val;
        }
      }

      const cells = Object.entries(sheet)
        .filter(([key]) => key.includes(cardRow.toString()))
        .map(([, val]) => (typeof val?.v === "string" ? genKey(val?.v) : val?.v));

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

      console.log("sales", sales);
      console.log("cheques", cheques);
      console.log("cards", cards);

      resolve(new Row(datum, sales, cards, cheques));
    };

    temporaryFileReader.readAsArrayBuffer(inputFile);
  });
};

export default convertUploadedCsvToRow;
