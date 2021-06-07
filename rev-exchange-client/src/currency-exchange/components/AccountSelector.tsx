import numeral from 'numeral';
import React from 'react';
import styled from 'styled-components';
import { RevAccount } from '../models/Account';
import { RevCurrencyCode } from '../models/Currency';
import { FormElement, FormElementInfo, SelectElement } from '../shared';

export interface AccountSelectorProps {
  list: RevAccount[];
  account?: RevAccount;
  accountSelected: (account: RevAccount) => void;
  maxAmountSelected: (amount: numeral.Numeral) => void;
}

const SelectorFormElement = styled(FormElement)`
  align-items: center;
`; 
const AccountSelectElement = styled(SelectElement)`
`;
const BalanceInfo = styled(FormElementInfo)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const AccountSelector = (props: AccountSelectorProps) => {
  return (
    <SelectorFormElement>
      <AccountSelectElement value={props?.account?.currency?.code} onChange={(ev) => {
        const code: RevCurrencyCode = ev?.target?.value as RevCurrencyCode;
        if (code) {
          const found = props.list.find(e => e?.currency?.code === code);
          if (found) {
            props.accountSelected(found);
          }
        }
      }}>
        {props?.list?.map(e => <option key={e?.currency?.code} value={e?.currency?.code}>{e?.currency?.code} - {e?.currency?.name}</option>)}
      </AccountSelectElement>
      <BalanceInfo aria-label="balance-info" onClick={() => !!props?.account?.amount && props.maxAmountSelected(props?.account?.amount)}>Balance: {props?.account?.amount?.value()} {props?.account?.currency?.code}</BalanceInfo>
    </SelectorFormElement>
  );
}

export default AccountSelector;
