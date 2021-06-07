import numeral from "numeral";
import { useEffect, useState } from "react";
import { RevAccount } from "../models/Account";
import { RevCurrencyCode } from "../models/Currency";
import { HTTP_FETCH_GET } from "../shared";

export function useRates(accounts: RevAccount[]): Map<string, numeral.Numeral> {
    const [rates, setRates] = useState<Map<string, numeral.Numeral>>(new Map());
    useEffect(() => {
        if (accounts?.length > 0) {
            const sync = () => {
                fetch('https://openexchangerates.org/api/latest.json?app_id=d1bb6494da774c91baba1bddae020aad', HTTP_FETCH_GET)
                    .then((response) => response?.json())
                    .then(({ rates: responseRates }) => { // Base rates based on USD
                        const chosenRates: Map<RevCurrencyCode, string> = new Map();
                        accounts.forEach(a => {
                            const currency: RevCurrencyCode = a?.currency?.code!;
                            if (responseRates?.[currency]) {
                                chosenRates.set(currency, `${responseRates[currency]}`);
                            }
                        });
                        const calculatedRates: Map<string, numeral.Numeral> = new Map();
                        chosenRates.forEach((fromRate, fromCurrency) => {
                            chosenRates.forEach((toRate, toCurrency) => {
                                if (fromCurrency !== toCurrency) {
                                    const key = `${fromCurrency}${toCurrency}`;
                                    const value = numeral(toRate).divide(numeral(fromRate).value());
                                    calculatedRates.set(key, value);
                                };
                            });
                        });
                        setRates(calculatedRates);
                    })
                    .catch(e => console.log(e));
            };
            sync();
            const interval = setInterval(() => sync(), 10000);
            return () => clearInterval(interval);
        }
    }, [accounts]);
    return rates;
}