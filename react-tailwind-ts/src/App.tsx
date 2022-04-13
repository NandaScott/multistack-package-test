import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { currencyList, CurrencyCode, getExchangeRate } from 'nds-common';
import clsx from 'clsx';

interface CurrencyOption {
  code: string;
  label: string;
}

export default function App() {
  const [from, setFrom] = useState<CurrencyCode | undefined>();
  const [to, setTo] = useState<CurrencyCode | undefined>();
  const [exchangeRate, setExchangeRate] = useState<any>();
  const currencies = useRef<CurrencyOption[]>(
    Object.entries(currencyList).map(([k, v]) => ({ code: k, label: v }))
  );

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

  return (
    <div className='bg-slate-500 h-full flex items-center justify-center flex-col gap-4 space-y-8'>
      <h1 className='text-white font-sans font-bold text-6xl'>
        Exchange Rate - o - matic
      </h1>
      <form
        onSubmit={onSubmit}
        className='flex bg-slate-200 gap-4 p-4 rounded-md shadow-md items-center'
      >
        <CurrencySelector onChange={setFrom} options={currencies.current} />
        <RightArrow />
        <CurrencySelector onChange={setTo} options={currencies.current} />
        <button
          type='submit'
          className='p-[1em] h-full w-[8em] bg-blue-500 rounded-md text-white font-sans font-semibold text-md'
        >
          Submit
        </button>
      </form>
      <Display exchangeRate={exchangeRate} from={from} to={to} />
    </div>
  );
}

interface CurrencySelectorProps<T extends string> {
  onChange: React.Dispatch<React.SetStateAction<CurrencyCode | undefined>>;
  options: Record<T, string>[];
}

const CurrencySelector = (props: CurrencySelectorProps<'code' | 'label'>) => {
  const { onChange, options } = props;
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');

  const filteredOptions = useMemo(() => {
    if (query === '') return options;

    return options.filter((op) =>
      op.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const handleInput = useCallback((e) => setQuery(e.target.value), []);

  const handleChange = useCallback(
    (e: CurrencyCode) => {
      setSelected(currencyList[e]);
      onChange(e);
    },
    [onChange]
  );

  return (
    <Combobox
      as='div'
      className='relative space-y-1 w-80'
      value={selected}
      onChange={handleChange}
    >
      <div>
        <Combobox.Input
          onChange={handleInput}
          className='w-full rounded-md pl-4 border-0 focus:outline-none focus:ring-0 text-md text-gray-800 placeholder:text-gray-400 h-16'
          placeholder='Search currencies...'
        />
        <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-4'>
          <SelectorIcon className='w-5 h-5 text-gray-400' aria-hidden='true' />
        </Combobox.Button>
      </div>
      <Combobox.Options className='w-full shadow-md space-y-2 no-scrollbar absolute overflow-y-scroll max-h-60 bg-white rounded-md'>
        {filteredOptions.length === 0 && query !== '' ? (
          <div className='cursor-default select-none relative py-2 px-4 text-gray-700'>
            Nothing found.
          </div>
        ) : (
          filteredOptions.map((op) => (
            <Combobox.Option as={React.Fragment} key={op.code} value={op.code}>
              {({ active }) => (
                <li
                  className={clsx({
                    'bg-blue-500 text-white p-2': active,
                    'bg-white text-black p-2': !active,
                  })}
                >
                  {op.label}
                </li>
              )}
            </Combobox.Option>
          ))
        )}
      </Combobox.Options>
    </Combobox>
  );
};

interface DisplayProps {
  exchangeRate: any;
  from: CurrencyCode | undefined;
  to: CurrencyCode | undefined;
}

const Display = (props: DisplayProps) => {
  const { exchangeRate, from, to } = props;
  if (!from || !to || !exchangeRate) return null;

  return (
    <div className='flex bg-slate-200 gap-4 p-4 flex-col rounded-md shadow-md items-left'>
      <p className='text-2xl font-sans text-gray-800'>Exchange Rate:</p>
      <p>
        1 {currencyList[from]} ({from.toUpperCase()}) equals {exchangeRate[to]}{' '}
        {currencyList[to]} ({to.toUpperCase()})
      </p>
    </div>
  );
};

const RightArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 text-blue-500'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14 5l7 7m0 0l-7 7m7-7H3'
    />
  </svg>
);

const SelectorIcon = ({ className }: { className: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8 9l4-4 4 4m0 6l-4 4-4-4'
    />
  </svg>
);
