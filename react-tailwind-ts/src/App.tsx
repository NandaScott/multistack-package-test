import QuestionResolver from './components/question-resolver';
import { useMIP, checkout } from 'nds-common';
import { FormPage } from 'nds-common/components';

export default function App() {
  const {
    currentPage,
    submitForm,
    register,
    handleSubmit,
    isLastPage,
    isFirstPage,
    nextPage,
    previousPage,
    getValues,
    watch,
    formState: { errors },
  } = useMIP('checkout', {
    debugValidation: true,
    hookFormConfig: {
      reValidateMode: 'onBlur',
    },
  });
  const sameBilling = watch('address.sameBilling') as boolean;

  return (
    <div className='flex justify-center items-center bg-gray-200 h-full py-40'>
      <form
        onSubmit={handleSubmit(submitForm)}
        className='flex gap-4 flex-col items-end'
      >
        <FormPage
          currentPage={currentPage}
          pageId='address'
          className='bg-white p-8 rounded shadow-md grid grid-cols-2 grid-flow-row gap-y-4'
        >
          <div className='col-span-2 grid gap-4 grid-cols-2 grid-flow-row'>
            <p className='text-gray-400 col-span-2 text-lg font-semibold'>
              Contact Info
            </p>
            <QuestionResolver
              questions={checkout.address}
              register={register}
              sliceQuestions={{ end: 3 }}
              errors={errors}
              pageId='address'
            />
          </div>
          <div className='col-span-2 grid gap-4 grid-cols-2 grid-flow-row mt-4'>
            <p className='text-gray-400 col-span-2 text-lg font-semibold'>
              Shipping Info
            </p>
            <QuestionResolver
              questions={checkout.address}
              register={register}
              sliceQuestions={{ start: 3, end: 9 }}
              errors={errors}
              pageId='address'
            />
          </div>
          {!sameBilling && (
            <div className='col-span-2 grid gap-4 grid-cols-2 grid-flow-row mt-4'>
              <p className='text-gray-400 col-span-2 text-lg font-semibold'>
                Billing Info
              </p>
              <QuestionResolver
                questions={checkout.address}
                register={register}
                sliceQuestions={{ start: 9 }}
                errors={errors}
                pageId='address'
              />
            </div>
          )}
        </FormPage>
        <FormPage
          pageId='ccinfo'
          currentPage={currentPage}
          className='bg-white p-8 rounded shadow-md grid grid-cols-2 grid-flow-row gap-y-4'
        >
          <div className='col-span-2 grid gap-4 grid-cols-2 grid-flow-row'>
            <p className='text-gray-400 col-span-2 text-lg font-semibold'>
              Payment Info
            </p>
            <QuestionResolver
              errors={errors}
              questions={checkout.ccinfo}
              register={register}
              pageId='ccinfo'
            />
          </div>
        </FormPage>
        <FormPage
          pageId='upsell'
          currentPage={currentPage}
          className='bg-white p-8 rounded shadow-md grid grid-cols-2 grid-flow-row gap-y-4'
        >
          <p className='text-gray-800 col-span-2 text-lg font-semibold'>
            Can we tempt you with a cookie?
          </p>
          <p className='text-gray-800 col-span-2'>We promise they are tasty</p>
          <QuestionResolver
            errors={errors}
            questions={checkout.upsell}
            register={register}
            pageId='upsell'
          />
        </FormPage>
        <FormPage
          pageId='confirmation'
          currentPage={currentPage}
          className='bg-white p-8 rounded shadow-md flex items-start gap-8'
        >
          <div className='grid gap-4 grid-cols-2 grid-flow-row'>
            <p className='text-gray-500 col-span-2 text-lg font-semibold'>
              Contact Info
            </p>
            <p className='text-gray-400'>First Name</p>
            <p>{getValues('address.firstName')}</p>
            <p className='text-gray-400'>Last Name</p>
            <p>{getValues('address.lastName')}</p>
            <p className='text-gray-400'>Address 1</p>
            <p>{getValues('address.shippingAddress')}</p>
            <p className='text-gray-400'>Address 2</p>
            <p>{getValues('address.shippingAddress2')}</p>
            <p className='text-gray-400'>Country</p>
            <p>{getValues('address.country')}</p>
            <p className='text-gray-400'>State</p>
            <p>{getValues('address.state')}</p>
            <p className='text-gray-400'>Zip</p>
            <p>{getValues('address.zipcode')}</p>
            <p className='text-gray-400'>Same Billing</p>
            <p>{JSON.stringify(getValues('address.sameBilling'))}</p>
          </div>
          <div className='grid gap-4 grid-cols-2 grid-flow-row'>
            <p className='text-gray-500 col-span-2 text-lg font-semibold'>
              Payment Info
            </p>
            <p className='text-gray-400'>Card Number</p>
            <p>{getValues('ccinfo.ccNumber')}</p>
            <p className='text-gray-400'>Expiration</p>
            <p>{getValues('ccinfo.ccExp')}</p>
            <p className='text-gray-400'>CVV</p>
            <p>{getValues('ccinfo.cvv')}</p>
          </div>
          <div className='col-span-2 grid gap-4 grid-cols-2 grid-flow-row'>
            <p className='text-gray-500 col-span-2 text-lg font-semibold'>
              Upsell Info
            </p>
            <p className='text-gray-400'>Cookies</p>
            <p>{JSON.stringify(getValues('upsell.includeCookie'))}</p>
          </div>
        </FormPage>
        <div className='flex w-full gap-4 justify-end'>
          {!isFirstPage && (
            <button
              onClick={previousPage}
              type='button'
              className='p-[.5em] rounded uppercase text-xl font-semibold w-1/2 border-b-2'
            >
              Back
            </button>
          )}
          {!isLastPage && (
            <button
              onClick={nextPage}
              type='button'
              className='bg-blue-500 text-white p-[.5em] rounded uppercase text-xl font-semibold w-1/2 border-b-2 border-blue-600 shadow-sm'
            >
              Next
            </button>
          )}
          {isLastPage && (
            <button
              type='submit'
              className='bg-blue-500 text-white p-[.5em] rounded uppercase text-xl font-semibold w-1/2 border-b-2 border-blue-600 shadow-sm'
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
