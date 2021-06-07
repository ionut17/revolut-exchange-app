import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import numeral from 'numeral';
import { CurrencyExchangeContext, CurrencyExchangeState } from '../CurrencyExchange';
import { TEST_CURRENCIES } from '../../App.test';
import { RevAccount } from '../models/Account';
import ExchangeControls from './ExchangeControls';
import { ExchangeRequest } from '../models/ExchangeRequest';

const TEST_ACCOUNTS = [
  new RevAccount(TEST_CURRENCIES.EUR, '1000'),
  new RevAccount(TEST_CURRENCIES.USD, '500'),
];

const setup = () => {
  const context: CurrencyExchangeState = {
    accounts: TEST_ACCOUNTS,
    rates: new Map([
      ['EURUSD', numeral(1.22)],
      ['USDEUR', numeral(0.82)]
    ]),
    exchange: jest.fn()
  };
  const elem = render(
    <CurrencyExchangeContext.Provider value={context}>
      <ExchangeControls />
    </CurrencyExchangeContext.Provider>
  );
  const fromContainer = elem.getByLabelText('from-input')!;
  const fromAccountSelect = fromContainer.querySelector('select')!;
  const fromValueInput = fromContainer.querySelector('input')!;

  const toContainer = elem.getByLabelText('to-input')!;
  const toAccountSelect = toContainer.querySelector('select')!;
  const toValueInput = toContainer.querySelector('input')!;

  const exchangeSwitch = elem.getByLabelText('exchange-switch')!;
  const button = elem.getByLabelText('exchange-button')!;
  return { elem, context, button, exchangeSwitch, fromAccountSelect, fromValueInput, toAccountSelect, toValueInput };
};

describe('ExchangeControls', () => {

  it('should preselect the first 2 accounts', () => {
    const { fromAccountSelect, toAccountSelect, context } = setup();
    expect(fromAccountSelect?.value).toBe(context.accounts[0].currency?.code);
    expect(toAccountSelect?.value).toBe(context.accounts[1].currency?.code);
  })

  it('should switch accounts', () => {
    const { exchangeSwitch, fromAccountSelect, toAccountSelect, context } = setup();
    exchangeSwitch.click();
    expect(fromAccountSelect?.value).toBe(context.accounts[1].currency?.code);
    expect(toAccountSelect?.value).toBe(context.accounts[0].currency?.code);
  });

  it('should show correct rate exchange', () => {
    const { elem, context, exchangeSwitch } = setup();
    const currency1 = context.accounts[0].currency?.code;
    const currency2 = context.accounts[1].currency?.code;
    
    const rateValue = context.rates.get(`${currency1}${currency2}`);
    expect(elem.getByText(new RegExp(`${rateValue} ${currency2}`, 'i'))).toBeInTheDocument();

    exchangeSwitch.click();
    const reversedRate = context.rates.get(`${currency2}${currency1}`);
    expect(elem.getByText(new RegExp(`${reversedRate} ${currency1}`, 'i'))).toBeInTheDocument();
  })

  it('should calculate the exchange value correctly', () => {
    const { fromValueInput, toValueInput, context } = setup();
    const currency1 = context.accounts[0].currency?.code;
    const currency2 = context.accounts[1].currency?.code;
    const rateValue = context.rates.get(`${currency1}${currency2}`);
    const inversedRateValue = context.rates.get(`${currency2}${currency1}`);

    const fromValue = '100';
    fireEvent.change(fromValueInput, { target: { value: fromValue } });
    const exchanged1 = numeral(fromValue).multiply(rateValue?.value()) ;
    expect(numeral(toValueInput.value).value()).toEqual(exchanged1.value());

    const toValue = '50';
    fireEvent.change(toValueInput, { target: { value: toValue } });
    const exchanged2 = numeral(toValue).multiply(inversedRateValue?.value()) ;
    expect(numeral(fromValueInput.value).value()).toEqual(exchanged2.value());
  })

  it('should limit the decimals to maximum 2', () => {
    const { fromValueInput } = setup();
    const value = '100.2333';
    fireEvent.change(fromValueInput, { target: { value } });
    expect(fromValueInput.value).toEqual('100.23');
  })

  it('should limit the values to maximum 13 digits', () => {
    const { fromValueInput } = setup();
    const value = '12345678912345';
    fireEvent.change(fromValueInput, { target: { value } });
    expect(fromValueInput.value).toEqual('1234567891234');
  })

  it('should emit a request when valid exchange is added', () => {
    const { fromValueInput, context, button } = setup();
    button.click();
    expect(context.exchange).toHaveBeenCalledTimes(0);
    
    const currency1 = context.accounts[0].currency?.code;
    const currency2 = context.accounts[1].currency?.code;
    const rateValue = context.rates.get(`${currency1}${currency2}`);

    let value = '999999';
    fireEvent.change(fromValueInput, { target: { value } });
    button.click();
    expect(context.exchange).toHaveBeenCalledTimes(0);

    value = '100';
    fireEvent.change(fromValueInput, { target: { value } });
    button.click();
    expect(context.exchange).toHaveBeenCalledTimes(1);

    const exchanged = numeral(value)
      .multiply(rateValue?.value())
      .value()?.toString(); // Emulate to input
    expect(context.exchange).toHaveBeenCalledWith(new ExchangeRequest(context.accounts[0], numeral(value), context.accounts[1], numeral(exchanged)));
  })

});