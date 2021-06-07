import React from 'react';
import styled from 'styled-components';
import ExchangeControls from './components/ExchangeControls';
import ExchangeHeader from './components/ExchangeHeader';
import { useRates } from './hooks/useRates';
import { RevAccount } from './models/Account';
import { ExchangeRequest } from './models/ExchangeRequest';
import { CurrencyExchangeWidgetConfig } from './shared';

export const CurrencyExchangeWidget = styled(CurrencyExchangeWidgetConfig)`
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;

    width: 100%;
    max-width: 600px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
`;

export interface CurrencyExchangeProps {
  accounts: RevAccount[];
  exchange: (request: ExchangeRequest) => void;
}

export interface CurrencyExchangeState {
  accounts: RevAccount[];
  rates: Map<string, numeral.Numeral>;
  exchange: (request: ExchangeRequest) => void;
}

export const CurrencyExchangeContext = React.createContext<CurrencyExchangeState>({ accounts: [], rates: new Map(), exchange: () => {} });

const CurrencyExchange = (props: CurrencyExchangeProps) => {
  const rates = useRates(props?.accounts);
  return (
    <CurrencyExchangeContext.Provider value={{ accounts: props.accounts, rates, exchange: (request) => props?.exchange(request) }}>
      <CurrencyExchangeWidget>
        <ExchangeHeader accounts={props.accounts}></ExchangeHeader>
        <ExchangeControls></ExchangeControls>
      </CurrencyExchangeWidget>
    </CurrencyExchangeContext.Provider>
  );
}

export default CurrencyExchange;
