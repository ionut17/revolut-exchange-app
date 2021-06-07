import numeral from "numeral";
import { useEffect, useState } from "react";
import { RevCurrencyCode } from "../models/Currency";

export function useConversionRates(rates: Map<string, numeral.Numeral>, fromCurrencyCode?: RevCurrencyCode, toCurrencyCode?: RevCurrencyCode) {
    const [directRate, setDirectRate] = useState<numeral.Numeral>(numeral(0));
    const [inverseRate, setInverseRate] = useState<numeral.Numeral>(numeral(0));
    useEffect(() => {
        const directRate = rates?.get(`${fromCurrencyCode}${toCurrencyCode}`);
        directRate && setDirectRate(directRate);
        const inverseRate = rates?.get(`${toCurrencyCode}${fromCurrencyCode}`);
        inverseRate && setInverseRate(inverseRate);
    }, [rates, fromCurrencyCode, toCurrencyCode]);
    return { directRate, inverseRate };
}

