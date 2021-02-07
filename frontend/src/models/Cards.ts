export enum CardsEnum {
    amex = "amex",
    visa = "visa",
    mastercard = "mastercard",
    maestro = "maestro",
    visa_electron = "visa_electron"
}

export type Cards = {
  [key in CardsEnum]: number;
}

export const newCards = (): Cards =>  ({
    amex: 0,
    visa:0,
    mastercard: 0,
    maestro: 0,
    visa_electron: 0
 })