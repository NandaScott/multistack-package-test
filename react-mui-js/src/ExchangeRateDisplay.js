import React from 'react';
import { Paper, Typography } from '@mui/material';
import { currencyList } from 'nds-common/build';
import './App.css';

export default function ExchangeRateDisplay(props) {
  const { from, to, exchangeRate } = props;

  if (from === '' || to === '' || !exchangeRate) return null;

  return (
    <Paper className='paper'>
      <Typography variant='h4'>Exchange Rate:</Typography>
      <div className='results-container'>
        <Typography>
          1 {currencyList[from]} ({from.toUpperCase()})
        </Typography>
        <Typography>equals</Typography>
        <Typography>
          {JSON.stringify(exchangeRate[to])} {currencyList[to]} (
          {to.toUpperCase()})
        </Typography>
      </div>
    </Paper>
  );
}
