import React, { useCallback, useRef, useState } from 'react';
import {
  Autocomplete,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { currencyList, getExchangeRate } from 'nds-common';
import invert from 'lodash/invert';
import './App.css';
import ExchangeRateDisplay from './ExchangeRateDisplay';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [exchangeRate, setExchangeRate] = useState();
  const currencies = useRef(
    Object.entries(currencyList).map(([k, v]) => ({
      label: v,
      code: k.toUpperCase(),
    }))
  );
  const codes = useRef(invert(currencyList));

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!from || !to) return;
      getExchangeRate('latest', from, to)
        .then((resp) => setExchangeRate(resp.data))
        .catch(console.error);
    },
    [from, to]
  );

  const handleChange = useCallback(
    (input) => (e) => {
      if (input === 'from') {
        setFrom(codes.current[e.target.textContent]);
      }
      if (input === 'to') {
        setTo(codes.current[e.target.textContent]);
      }
    },
    []
  );

  return (
    <div className='main-container'>
      <Typography className='title' variant='h2'>
        Exchange Rate - o - matic
      </Typography>
      <Paper className='paper'>
        <form onSubmit={onSubmit}>
          <div className='controls'>
            <Autocomplete
              autoHighlight
              className='autocomplete'
              onChange={handleChange('from')}
              options={currencies.current}
              renderInput={(params) => <TextField {...params} label='from' />}
            />
            <ArrowRightAltIcon
              fontSize='large'
              className='arrow-icon'
              color='primary'
            />
            <Autocomplete
              autoHighlight
              className='autocomplete'
              onChange={handleChange('to')}
              options={currencies.current}
              renderInput={(params) => <TextField {...params} label='to' />}
            />
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </div>
        </form>
      </Paper>
      <ExchangeRateDisplay from={from} to={to} exchangeRate={exchangeRate} />
    </div>
  );
}

export default App;
