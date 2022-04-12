const RightArrow = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6 text-white'
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

function App() {
  return (
    <div className='bg-slate-500 h-full flex items-center justify-center flex-col'>
      <h1 className='text-white font-sans font-bold text-6xl'>
        Exchange - o - matic
      </h1>
      <RightArrow />
    </div>
  );
}

export default App;
