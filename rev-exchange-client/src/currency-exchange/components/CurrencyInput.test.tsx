import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import numeral, { Numeral } from 'numeral';
import CurrencyInput, { CurrencyInputProps } from './CurrencyInput';

const setup = (amount: Numeral) => {
  const props: CurrencyInputProps = {
    max: 1000,
    maxError: 'maxError',
    amount,
    amountChange: jest.fn()
  };
  const elem = render(<CurrencyInput {...props}/>);
  const input = elem.getByLabelText('currency-input');
  return { elem, props, input };
};

describe('CurrencyInput', () => {

    test('It should return a numeral based on input', () => {
      const { input, props } = setup(numeral(100));
      
      fireEvent.change(input, { target: { value: '23' } });
      expect(props.amountChange).toHaveBeenCalledTimes(1);
      expect(props.amountChange).toHaveBeenCalledWith(numeral('23'));
    })
    
    test('It should show error when exceeding max', () => {
      const { elem, props } = setup(numeral(2000));
      const error = elem.getByText(new RegExp(props.maxError!, 'i'));
      
      expect(props.amountChange).toHaveBeenCalledTimes(0);
      expect(error).toBeInTheDocument();
    })
  
  });