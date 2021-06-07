import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import CurrencyExchange, { CurrencyExchangeProps } from './CurrencyExchange';
import { TEST_ACCOUNTS } from '../App.test';

const setup = () => {
  const props: CurrencyExchangeProps = {
    accounts: TEST_ACCOUNTS,
    exchange: jest.fn()
  };
  const elem = render(<CurrencyExchange {...props}/>);
  return { elem, props };
};

describe('CurrencyExchange', () => {

  it('renders the widget', () => {
    const { elem } = setup();
    expect(elem.getByText(/CURRENCY EXCHANGE/i)).toBeInTheDocument();
  })

  it('should emit a request when valid exchange is received', () => {
    const { elem, props } = setup();
    const fromValueInput = elem.getByLabelText('from-input').querySelector('input')!;
    const exchangeButton = elem.getByLabelText('exchange-button')!;

    fireEvent.change(fromValueInput, { target: { value: '100' } });
    exchangeButton.click();
    expect(props.exchange).toHaveBeenCalledTimes(1);
  })

});
