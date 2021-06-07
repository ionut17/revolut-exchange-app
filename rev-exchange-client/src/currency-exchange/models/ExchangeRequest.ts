import numeral from "numeral";
import { RevAccount } from "./Account";

export class ExchangeRequest {

    constructor(public from?: RevAccount,
        public fromAmount?: numeral.Numeral,
        public to?: RevAccount,
        public toAmount?: numeral.Numeral ) {}

    public isValid(): boolean {
        const amount = this.fromAmount?.value();
        const max = this.from?.amount?.value();
        return !!(
            this.from && !!amount &&
            this.fromAmount && !!max &&
            this.to &&
            this.toAmount &&
            (amount as number) <= (max as number));
    }

}