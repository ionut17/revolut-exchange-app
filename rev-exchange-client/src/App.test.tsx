import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CurrencyExchange, { CurrencyExchangeProps } from './currency-exchange/CurrencyExchange';
import { RevAccount } from './currency-exchange/models/Account';
import { RevCurrencyCode, RevCurrency } from './currency-exchange/models/Currency';
import App from './App';
import numeral from 'numeral';

export const TEST_CURRENCIES: { [key in RevCurrencyCode]: RevCurrency } = {
  [RevCurrencyCode.EUR]: new RevCurrency(RevCurrencyCode.EUR, 'Euro'),
  [RevCurrencyCode.USD]: new RevCurrency(RevCurrencyCode.USD, 'Dollar'),
  [RevCurrencyCode.GBP]: new RevCurrency(RevCurrencyCode.GBP, 'Pound'),
  [RevCurrencyCode.RON]: new RevCurrency(RevCurrencyCode.RON, 'Leu'),
}

export const TEST_ACCOUNTS: RevAccount[] = [
  new RevAccount(TEST_CURRENCIES.EUR, '1000'),
  new RevAccount(TEST_CURRENCIES.USD, '500'),
  new RevAccount(TEST_CURRENCIES.GBP, '500'),
  new RevAccount(TEST_CURRENCIES.RON, '250')
]

const setup = () => {
  const props = {
    accounts: TEST_ACCOUNTS
  }
  const elem = render(<App {...props}/>);
  return { elem, props };
};

describe('App', () => {

  it('renders the widget', () => {
    const { elem } = setup();
    expect(elem.getByText(/CURRENCY EXCHANGE/i)).toBeInTheDocument();
  })

  it('update the accounts when an exchange request is received', () => {
    const { elem, props } = setup();
    const fromValueInput = elem.getByLabelText('from-input').querySelector('input')!;
    const exchangeButton = elem.getByLabelText('exchange-button')!;

    const initialValue = props.accounts[0].amount?.value();
    fireEvent.change(fromValueInput, { target: { value: '100' } });
    exchangeButton.click();
    expect(props.accounts[0].amount?.value()).toEqual(numeral(initialValue).subtract(100).value());
  })

});
