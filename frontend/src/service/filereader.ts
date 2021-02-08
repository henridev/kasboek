import { read } from "xlsx";
import { Row } from "../models";
import { convertToIsoStringTwo } from "../utils";
import { createRowForDataOnlyXLS, createRowForCompleyXLS } from "./parser";


const convertUploadedCsvToRow = (inputFile): Promise<Row> => {
  const temporaryFileReader = new FileReader();


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
      let datum: string
      // console.log('sheet', sheet)
     
      datum = sheet?.A1?.v.match(/\d{2}\/\d{2}\/\d{4}/)[0];
      if(datum){
        datum =  convertToIsoStringTwo(datum)
        const [sales, cards, cheques] = createRowForDataOnlyXLS(sheet)
        resolve(new Row(datum, sales, cards, cheques));
      } else {
        datum = convertToIsoStringTwo(sheet?.C5?.v.match(/\d{2}\/\d{2}\/\d{4}/)[0])
        const [sales, cards, cheques] = createRowForCompleyXLS(sheet)
        resolve(new Row(datum, sales, cards, cheques));
      }
      
    };

    temporaryFileReader.readAsArrayBuffer(inputFile);
  });
};

export default convertUploadedCsvToRow;
