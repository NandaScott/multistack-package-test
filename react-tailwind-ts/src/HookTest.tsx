import { useMIP } from './hooks/useMIP';

export default function HookTest() {
  const {
    pages,
    currentPage,
    pageHistory,
    nextPage,
    previousPage,
    currentStep,
    isFirstPage,
    isLastPage,
  } = useMIP({
    pageIds: ['foo', 'bar', 'baz'],
    onNext: () => console.log('next'),
    pageSkips: () => {
      if (currentPage === 3) {
        return 5;
      }
    },
  });

  return (
    <div className='bg-slate-500 h-full flex flex-col justify-center gap-16'>
      <div className='grid grid-flow-row grid-cols-3 gap-4 px-8'>
        <DemoBox title='pageIds'>[{pages.join(', ')}]</DemoBox>
        <DemoBox title='currentPage'>{currentPage}</DemoBox>
        <DemoBox title='pageHistory'>[{pageHistory.join(', ')}]</DemoBox>
        <DemoBox title='currentStep'>{currentStep}</DemoBox>
        <DemoBox title='isFirstPage'>{JSON.stringify(isFirstPage)}</DemoBox>
        <DemoBox title='isLastPage'>{JSON.stringify(isLastPage)}</DemoBox>
      </div>
      <div className='flex justify-evenly'>
        <button
          className='p-[1em] bg-red-500 rounded-md text-white shadow-md border-b-2 border-red-600 font-sans font-semibold text-lg'
          onClick={previousPage}
        >
          Previous Page
        </button>
        <button
          className='p-[1em] bg-blue-500 rounded-md text-white shadow-md border-b-2 border-blue-600 font-sans font-semibold text-lg'
          onClick={nextPage}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}

const DemoBox = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <div className='flex flex-col gap-1 bg-gray-200 p-4 text-lg rounded-md'>
    <p className='text-gray-600 text-xs'>{title}</p>
    <code className='text-gray-900'>{children}</code>
  </div>
);
