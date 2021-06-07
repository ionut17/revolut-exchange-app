import numeral from 'numeral';
import styled from 'styled-components';
import { RevCurrency } from '../models/Currency';
import { formatAmount } from '../shared';

export interface ExchangeRateIndicatorProps {
    fromCurrency?: RevCurrency;
    rate?: numeral.Numeral;
    toCurrency?: RevCurrency;
}

const ExchangeRate = styled.span`
  grid-column: 1 / 4;
  justify-self: center;

  font-size: 14px;
  color: var(--themeAccent);
`;

const ExchangeRateIndicator = (props: ExchangeRateIndicatorProps) => {
  return (
      <ExchangeRate><strong>1</strong> {props?.fromCurrency?.code} = <strong>{formatAmount(props?.rate)?.value()}</strong> {props?.toCurrency?.code}</ExchangeRate>
  );
}

export default ExchangeRateIndicator;
