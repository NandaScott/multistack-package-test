import QuestionResolver from './components/question-resolver';
import { useMIP, checkout } from 'nds-common';
import { FormPage } from 'nds-common/components';
import { Button, Typography } from '@mui/material';
import './App.css';

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
  } = useMIP('checkout');
  const sameBilling = watch('address.sameBilling');

  return (
    <div className='main-container'>
      <form onSubmit={handleSubmit(submitForm)}>
        <FormPage
          currentPage={currentPage}
          pageId='address'
          className='form-page'
        >
          <div className='form-page__container'>
            <Typography variant='h5' className='col-span-2'>
              Contact Info
            </Typography>
            <QuestionResolver
              questions={checkout.address}
              register={register}
              sliceQuestions={{ end: 3 }}
              errors={errors}
              pageId='address'
            />
          </div>
          <div className='form-page__container mt-4'>
            <Typography variant='h5' className='col-span-2'>
              Shipping Info
            </Typography>
            <QuestionResolver
              questions={checkout.address}
              register={register}
              sliceQuestions={{ start: 3, end: 9 }}
              errors={errors}
              watch={watch}
              pageId='address'
            />
          </div>
          {!sameBilling && (
            <div className='form-page__container mt-4'>
              <Typography variant='h5' className='col-span-2'>
                Billing Info
              </Typography>
              <QuestionResolver
                questions={checkout.address}
                register={register}
                sliceQuestions={{ start: 9 }}
                errors={errors}
                pageId='address'
                watch={watch}
              />
            </div>
          )}
        </FormPage>
        <FormPage
          pageId='ccinfo'
          currentPage={currentPage}
          className='form-page'
        >
          <div className='form-page__container'>
            <Typography variant='h5' className='col-span-2'>
              Payment Info
            </Typography>
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
          className='form-page'
        >
          <Typography variant='h6' className='col-span-2'>
            Can we tempt you with a cookie?
          </Typography>
          <Typography variant='subtitle1' paragraph className='col-span-2'>
            We promise they are tasty
          </Typography>
          <QuestionResolver
            errors={errors}
            questions={checkout.upsell}
            register={register}
            pageId='upsell'
            watch={watch}
          />
        </FormPage>
        <FormPage
          pageId='confirmation'
          currentPage={currentPage}
          className='form-page grid-cols-3 items-start gap-x-4'
        >
          <div className='confirmation-page__container'>
            <Typography variant='h5' className='col-span-2'>
              Contact Info
            </Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              First Name
            </Typography>
            <Typography paragraph>{getValues('address.firstName')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Last Name
            </Typography>
            <Typography paragraph>{getValues('address.lastName')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Address 1
            </Typography>
            <Typography paragraph>
              {getValues('address.shippingAddress')}
            </Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Address 2
            </Typography>
            <Typography paragraph>
              {getValues('address.shippingAddress2')}
            </Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Country
            </Typography>
            <Typography paragraph>{getValues('address.country')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              State
            </Typography>
            <Typography paragraph>{getValues('address.state')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Zip
            </Typography>
            <Typography paragraph>{getValues('address.zipcode')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Same Billing
            </Typography>
            <Typography paragraph>
              {JSON.stringify(getValues('address.sameBilling'))}
            </Typography>
          </div>
          <div className='confirmation-page__container'>
            <Typography variant='h5' className='col-span-2'>
              Payment Info
            </Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Card Number
            </Typography>
            <Typography paragraph>{getValues('ccinfo.ccNumber')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Expiration
            </Typography>
            <Typography paragraph>{getValues('ccinfo.ccExp')}</Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              CVV
            </Typography>
            <Typography paragraph>{getValues('ccinfo.cvv')}</Typography>
          </div>
          <div className='confirmation-page__container'>
            <Typography variant='h5' className='col-span-2'>
              Upsell Info
            </Typography>
            <Typography paragraph className='confirmation-page__text-label'>
              Cookies
            </Typography>
            <Typography paragraph>
              {JSON.stringify(getValues('upsell.includeCookie'))}
            </Typography>
          </div>
        </FormPage>
        <div className='button-controller'>
          {!isFirstPage && (
            <Button
              variant='text'
              color='secondary'
              size='large'
              onClick={previousPage}
            >
              Back
            </Button>
          )}
          {!isLastPage && (
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={nextPage}
            >
              Next
            </Button>
          )}
          {isLastPage && (
            <Button
              variant='contained'
              color='primary'
              size='large'
              type='submit'
            >
              Next
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
