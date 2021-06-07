import React from 'react';
import styled from 'styled-components';
import { RevAccount } from '../models/Account';
import { Heading1, Paragraph } from '../shared';

export interface ExchangeControlsProps {
  accounts: RevAccount[];
}

const ExchangeHeaderContainer = styled.header`
  padding: var(--contentPadding);
  border-bottom: 1px solid rgba(0,0,0,0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  overflow: auto;
`;

const AccountList = styled.section`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  
  width: 100%;
  row-gap: 20px;
  margin-top: 30px;
  
  text-align: center;
`;
const AccountListEntry = styled.div`
  width: 100px;
  height: 100px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--themeGrey);
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.05);
  
  strong {
    font-size: 20px;
    color: var(--themeAccent)
  }
`;

const ExchangeHeader = (props: ExchangeControlsProps) => {
  return (
    <ExchangeHeaderContainer>
        <Heading1>Currency Exchange</Heading1>
        <Paragraph>Convert between your account currencies.</Paragraph>
        <AccountList>
          {props?.accounts.map(a => <AccountListEntry key={a.currency?.code}><strong>{a.amount?.value()}</strong>{a.currency?.code}</AccountListEntry>)}
        </AccountList>
    </ExchangeHeaderContainer>
  );
}

export default ExchangeHeader;
