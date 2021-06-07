import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import AccountSelector, { AccountSelectorProps } from './AccountSelector';
import { RevAccount } from '../models/Account';
import { TEST_ACCOUNTS } from '../../App.test';

const setup = (account?: RevAccount) => {
  const props: AccountSelectorProps = {
    list: TEST_ACCOUNTS,
    account,
    accountSelected: jest.fn(),
    maxAmountSelected: jest.fn()
  };
  const elem = render(<AccountSelector {...props} />);
  const select = elem.container.querySelector('select')!;
  return { elem, select, props };
};

describe('AccountSelector', () => {

  it('should show options based on list received', () => {
    const { select } = setup();
    const options = new Set();

    select.querySelectorAll('option').forEach(opt => options.add(opt.value));
    expect(TEST_ACCOUNTS.every(acc => options.has(acc?.currency?.code))).toBeTruthy();
  });

  it('should have the param account selected', () => {
    const selectedAccount = TEST_ACCOUNTS[0];
    const { select } = setup(selectedAccount);

    expect(selectedAccount?.currency?.code).toBe(select.value);
  });

  it('should emit a selected account', () => {
    const selectedAccount = TEST_ACCOUNTS[0];
    const { select, props } = setup();

    fireEvent.change(select, { target: { value: selectedAccount?.currency?.code } });
    expect(props.accountSelected).toHaveBeenCalledTimes(1);
    expect(props.accountSelected).toHaveBeenCalledWith(selectedAccount);
  });

  it('should display account balance and emit a selected maxAmount numeral', () => {
    const selectedAccount = TEST_ACCOUNTS[0];
    const { elem, props } = setup(selectedAccount);

    const balance = elem.getByLabelText('balance-info');
    expect(balance).toBeInTheDocument();

    balance.click();
    expect(props.maxAmountSelected).toHaveBeenCalledTimes(1);
    expect(props.maxAmountSelected).toHaveBeenCalledWith(selectedAccount.amount);
  });

});