import { useState } from 'react';
import styled from 'styled-components';
import CurrencyExchange from './currency-exchange/CurrencyExchange';
import { RevAccount } from './currency-exchange/models/Account';
import { RevCurrency, RevCurrencyCode } from './currency-exchange/models/Currency';
import { ExchangeRequest } from './currency-exchange/models/ExchangeRequest';

const AppContainer = styled.main`
  width: 100vw;
  min-height: 100vh;
  overflow: auto;
  
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  background-color: rgb(246, 247, 248);
  background-color: #2d3436;
  background: #000428;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #004e92, #000428);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #004e92, #000428); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`;

const CURRENCIES: { [key in RevCurrencyCode]: RevCurrency } = {
  [RevCurrencyCode.EUR]: new RevCurrency(RevCurrencyCode.EUR, 'Euro'),
  [RevCurrencyCode.USD]: new RevCurrency(RevCurrencyCode.USD, 'Dollar'),
  [RevCurrencyCode.GBP]: new RevCurrency(RevCurrencyCode.GBP, 'Pound'),
  [RevCurrencyCode.RON]: new RevCurrency(RevCurrencyCode.RON, 'Leu'),
}

const ACCOUNTS: RevAccount[] = [
  new RevAccount(CURRENCIES.EUR, '1000'),
  new RevAccount(CURRENCIES.USD, '500'),
  new RevAccount(CURRENCIES.GBP, '500'),
  new RevAccount(CURRENCIES.RON, '250')
]

export interface AppProps {
  accounts?: RevAccount[];
}

function App(props: AppProps) {
  const [accounts, setAccounts] = useState(props.accounts ?? ACCOUNTS);
  return (
    <AppContainer>
      <CurrencyExchange accounts={accounts} exchange={(request) => setAccounts(getAccountsWithExchange(accounts, request))}/>
    </AppContainer>
  );
}

export default App;


const getAccountsWithExchange = (accounts: RevAccount[], request: ExchangeRequest): RevAccount[] => {
  accounts.forEach(a => {
    if (a?.currency?.code === request?.from?.currency?.code) {
      a?.amount?.subtract(request?.fromAmount?.value());
    }
    else if (a?.currency?.code === request?.to?.currency?.code) {
      a?.amount?.add(request?.toAmount?.value());
    }
  });
  return [...accounts];
}