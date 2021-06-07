import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { RevAccount } from '../models/Account';
import AccountSelector from './AccountSelector';
import CurrencyInput from './CurrencyInput';
import numeral from 'numeral';
import { CurrencyExchangeContext } from '../CurrencyExchange';
import { Button, formatAmount, Switch } from '../shared';
import { ExchangeRequest } from '../models/ExchangeRequest';
import { useConversionRates } from '../hooks/useConversionRates';
import ExchangeRateIndicator from './ExchangeRateIndicator';

export interface ExchangeControlsProps {
}

const ExchangeControlsForm = styled.form`
  display: grid;
  grid-template-columns: 30px auto 1fr;
  grid-row-gap: 30px;
  justify-content: center;
  padding: var(--contentPadding);
`;
const CurrencyInputContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 10px;
  align-items: center;

  grid-column: 2 / span 2;
`;
const ExchangeButton = styled(Button)` grid-column: 1 / 4; justify-self: center;`;
const ExchangeSwitch = styled(Switch)` grid-column: 1 / 2; grid-row: span 2; justify-self: flex-start; align-self: center;`;


const ExchangeControls = (props: ExchangeControlsProps) => {
  const context = useContext(CurrencyExchangeContext);

  const [fromAccount, setFromAccount] = useState<RevAccount>(context.accounts[0]);
  const [fromAmount, setFromAmount] = useState<numeral.Numeral>();
  const [toAccount, setToAccount] = useState<RevAccount>(context.accounts[1]);
  const [toAmount, setToAmount] = useState<numeral.Numeral>();

  const { directRate, inverseRate } = useConversionRates(context?.rates, fromAccount?.currency?.code, toAccount?.currency?.code);

  // Hooks
  useEffect(() => {
    // When direct rate changes -> update the converted amounts
    if (fromAmount && directRate) changeFromAmount(fromAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directRate]);

  // Handlers
  const changeFromAccount = (account: RevAccount) => {
    setFromAccount(account);
    if (account?.currency?.code === toAccount?.currency?.code) setToAccount(fromAccount); // Switch currencies in case of same currency selected
  }
  const changeToAccount = (account: RevAccount) => {
    setToAccount(account);
    if (account?.currency?.code === fromAccount?.currency?.code) setFromAccount(toAccount); // Switch currencies in case of same currency selected
  }

  const changeFromAmount = (amount: numeral.Numeral) => {
    setFromAmount(formatAmount(amount));
    setToAmount(formatAmount(numeral(amount.value() ?? 0).multiply(directRate.value())));
  };
  const changeToAmount = (amount: numeral.Numeral) => {
    setToAmount(formatAmount(amount));
    setFromAmount(formatAmount(numeral(amount.value() ?? 0).multiply(inverseRate.value())));
  };

  return (
    <ExchangeControlsForm noValidate={true} onSubmit={(ev) => {
      ev.preventDefault();
      const request = new ExchangeRequest(fromAccount, fromAmount, toAccount, toAmount);
      if (request.isValid()) {
        context.exchange(request);
        setFromAmount(undefined);
        setToAmount(undefined);
      }
    }}>
      <ExchangeRateIndicator fromCurrency={fromAccount?.currency} toCurrency={toAccount?.currency} rate={directRate}></ExchangeRateIndicator>
      <ExchangeSwitch aria-label="exchange-switch" onClick={() => changeFromAccount(toAccount)}></ExchangeSwitch>

      <CurrencyInputContainer aria-label="from-input">
        <AccountSelector
          list={context?.accounts}
          account={fromAccount}
          accountSelected={changeFromAccount}
          maxAmountSelected={(amount) => changeFromAmount(amount)}/>
        <CurrencyInput
          max={fromAccount?.amount?.value()}
          maxError={`Exchange amount exceeds balance value`}
          amount={fromAmount}
          amountChange={(value) => changeFromAmount(value)}></CurrencyInput>
      </CurrencyInputContainer>

      <CurrencyInputContainer aria-label="to-input">
        <AccountSelector
          list={context?.accounts}
          account={toAccount}
          accountSelected={changeToAccount}
          maxAmountSelected={(amount) => changeToAmount(amount)}/>
        <CurrencyInput
          amount={toAmount}
          amountChange={(value) => changeToAmount(value)}></CurrencyInput>
      </CurrencyInputContainer>

      <ExchangeButton aria-label="exchange-button">
        Exchange {fromAccount?.currency?.code} to {toAccount?.currency?.code}
      </ExchangeButton>

    </ExchangeControlsForm>
  );
}

export default ExchangeControls;
