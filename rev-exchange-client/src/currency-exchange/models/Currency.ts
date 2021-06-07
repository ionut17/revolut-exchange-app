export enum RevCurrencyCode {
    EUR = 'EUR',
    USD = 'USD',
    RON = 'RON',
    GBP = 'GBP'
}

export class RevCurrency {
    name?: string;
    code?: RevCurrencyCode;

    constructor(code: RevCurrencyCode, name: string) {
        this.code = code;
        this.name = name;
    }
}