import type { Sales } from "./Sales";
import type { Cheques } from "./Cheques";
import type { Cards } from "./Cards";

export class Row {
  public datum: string;
  public omzet: number;
  public cheque_delhaize: number;
  public tegoebon: number;
  public publiciteitsbon: number;
  public leeggoedbon: number;
  public bancontact: number;
  public op_krediet: number;
  public andere: number;
  public amex: number;
  public visa: number;
  public mastercard: number;
  public maestro: number;
  public visa_electron: number;
  public payfair: number;
  public sodexo: number;
  public accordenred: number;
  public som_totaal: number;
  public verschil: number;
  public cash: number;

  constructor(datum: string, sales: Sales, cards: Cards, cheques: Cheques) {
    this.datum = datum;
    this.omzet = sales.totaal;
    this.cheque_delhaize = sales.cheque_delhaize;
    this.tegoebon = sales.tegoedbon_crea;
    this.publiciteitsbon =Number((sales.publiciteitsbon + sales.bon_pub_dll + sales.bon_pub_lev).toFixed(2))
    this.leeggoedbon = sales.leeggoedbon;
    this.bancontact = sales.bancontact;
    this.op_krediet = sales.op_krediet;
    this.andere =
      sales.cheq_spec +
      sales.tegoedbon +
      sales.ecocheques +
      sales.terugbet_lotto +
      sales.maaltijdcheque + 
      sales.superplus;
    this.amex = cards.amex;
    this.visa = cards.visa;
    this.mastercard = cards.mastercard;
    this.maestro = cards.maestro;
    this.visa_electron = cards.visa_electron;
    this.payfair =
      cheques.payfair["e-cadeau"] +
      cheques.payfair["e-eco"] +
      cheques.payfair["e-maaltijd"];
    this.sodexo =
      cheques.sodexo["e-cadeau"] +
      cheques.sodexo["e-eco"] +
      cheques.sodexo["e-maaltijd"];
    this.accordenred =
      cheques["accor_/_edenred"]["e-cadeau"] +
      cheques["accor_/_edenred"]["e-eco"] +
      cheques["accor_/_edenred"]["e-maaltijd"];
    this.som_totaal = 
      this.cheque_delhaize +
      this.tegoebon +
      this.publiciteitsbon +
      this.leeggoedbon +
      this.bancontact +
      this.op_krediet +
      this.andere +
      this.amex +
      this.visa +
      this.mastercard +
      this.maestro +
      this.visa_electron +
      this.payfair +
      this.sodexo +
      this.accordenred;
    this.som_totaal = Number(this.som_totaal.toFixed(2))
    this.verschil = Math.round(this.omzet - this.som_totaal - sales.cash);
    this.cash = sales.cash;
  }
}