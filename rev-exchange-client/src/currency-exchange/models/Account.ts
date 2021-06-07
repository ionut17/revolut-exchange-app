import numeral from "numeral";
import { RevCurrency } from "./Currency";

export class RevAccount {
    amount?: numeral.Numeral;
    currency?: RevCurrency;

    constructor(currency: RevCurrency, value?: string) {
        this.currency = currency;
        this.amount = value ? numeral(value) : numeral(0);        
    }
}