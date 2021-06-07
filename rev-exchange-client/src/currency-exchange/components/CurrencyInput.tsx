import React from 'react';
import styled from 'styled-components';
import { FormElement, InputElement, FormElementError } from '../shared';
import numeral from 'numeral';

export interface CurrencyInputProps {
  max?: number | null;
  maxError?: string;
  amount?: numeral.Numeral;
  amountChange: (value: numeral.Numeral) => void;
}

const CurrencyInputElement = styled(InputElement)``;

const CurrencyInput = (props: CurrencyInputProps) => {
  const exceedsAmount = props?.amount?.value() as number > (props?.max ?? Infinity);
  return (
    <FormElement>
      <CurrencyInputElement
        aria-label="currency-input"
        type="number"
        min="0"
        max={props?.max ?? ''}
        value={props?.amount?.value() ?? ''}
        onChange={(ev) => props?.amountChange(numeral(ev?.target?.value))}></CurrencyInputElement>
      {!!exceedsAmount && <FormElementError>{props?.maxError}</FormElementError>}
    </FormElement>
  );
}

export default CurrencyInput;