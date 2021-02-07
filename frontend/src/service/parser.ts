import { read, WorkBook } from "xlsx";
import { CardsEnum, newCards } from "../models/Cards";
import { ChequeEnum, ChequeSubCategorieEnum, newCheque } from "../models/Cheques";
import Row from "../models/Row";
import { newSales, SalesEnum } from "../models/Sales";
import { genKey } from "../utils";
const verkoopCijfers: [string, number, number] = ["C", 3, 29];
const verkoopCijfersTitelColumn: string = "A";
const cardRow: number = 29;

class Parser {
  private reader: FileReader;
  private files: File[];
  private currentWorkBook: WorkBook;

  constructor() {
    this.reader = new FileReader();
    this.reader.onload = this.handler;
  }

  public init(files: File[]) {
    for (const file of files) {
      if (file.name.toLowerCase().includes("xls")) {
        this.reader.readAsArrayBuffer(file);
      }
    }
  }

  private handler(ev: ProgressEvent<FileReader>): any {
    const {
      target: { result },
    } = ev;
    const data = new Uint8Array(result as ArrayBuffer);
    const workbook = read(data, { type: "array" });
    const sheet = workbook.Sheets.Sheet1;

    const sales = newSales()
    const datum: string = sheet.A1.v.match(/\d{2}\/\d{2}\/\d{4}/)[0];


    while (verkoopCijfers[1] < verkoopCijfers[2]) {
      const keyForVal = `${verkoopCijfers[0]}${verkoopCijfers[1]}`;
      const keyForTitel = `${verkoopCijfersTitelColumn}${verkoopCijfers[1]}`;
      const val = sheet[keyForVal].v;
      const titel = sheet[keyForTitel].v;
      verkoopCijfers[1]++;
      const key = genKey(titel)
      if(key in SalesEnum){
        sales[key] = val;
      }
    }

    const cells = Object.entries(sheet)
      .filter(([key]) => key.includes(cardRow.toString()))
      .map(([, val]) => (typeof val.v === "string" ? genKey(val.v) : val.v));

    const cards = newCards()
    const cheques = newCheque()
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


    return new Row(datum, sales, cards, cheques)
  }
}

export default new Parser();
