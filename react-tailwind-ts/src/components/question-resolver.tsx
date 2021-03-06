import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Question } from 'nds-common';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';

interface QuestionResolverProps {
  register: UseFormRegister<FieldValues>;
  errors: Record<string, unknown>;
  pageId: string | number;
  questions: Question[];
  sliceQuestions?: {
    start?: number;
    end?: number;
  };
}

export default function QuestionResolver(props: QuestionResolverProps) {
  const { questions, register, sliceQuestions, errors, pageId } = props;
  const { start, end } = sliceQuestions ?? { start: 0, end: questions.length };
  return (
    <>
      {questions
        .slice(start, end)
        .map(({ name, type, displayLabel, span2Cols, options, value }, i) => {
          if (type === 'select') {
            return (
              <div className='flex flex-col' key={`select-container-${name}`}>
                <select
                  key={`select-${name}`}
                  placeholder={displayLabel}
                  {...register(`${pageId}.${name}`)}
                >
                  <option key={`${name}-hidden`} hidden>
                    {displayLabel}
                  </option>
                  {options?.map(({ value, label }) => (
                    <option key={`${label}.${value}`} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ErrorMessage
                  key={`error-message-${name}`}
                  errors={errors}
                  name={`${pageId}.${name}`}
                  render={({ message }) => (
                    <p className='text-red-600 text-sm mt-1 font-medium'>
                      {message}
                    </p>
                  )}
                />
              </div>
            );
          }

          if (type === 'singleCheckbox') {
            return (
              <div
                key={`checkbox-container-${name}`}
                className='flex items-center'
              >
                <input
                  key={`input-${name}`}
                  type='checkbox'
                  id={name}
                  value={value?.toString()}
                  {...register(`${pageId}.${name}`)}
                />
                <label key={`label-${name}`} htmlFor={name} className='ml-2'>
                  {displayLabel}
                </label>
                <ErrorMessage
                  errors={errors}
                  name={`${pageId}.${name}`}
                  render={({ message }) => (
                    <p className='text-red-600 text-sm mt-1 font-medium'>
                      {message}
                    </p>
                  )}
                />
              </div>
            );
          }

          return (
            <div
              key={`input-container-${name}`}
              className={clsx(
                'flex flex-col',
                span2Cols ? 'col-span-2' : 'col-span-1'
              )}
            >
              <input
                key={`input-${name}`}
                type={type}
                placeholder={displayLabel}
                {...register(`${pageId}.${name}`)}
              />
              <ErrorMessage
                key={`error-message-${name}`}
                errors={errors}
                name={`${pageId}.${name}`}
                render={({ message }) => (
                  <p className='text-red-600 text-sm mt-1 font-medium'>
                    {message}
                  </p>
                )}
              />
            </div>
          );
        })}
    </>
  );
}
