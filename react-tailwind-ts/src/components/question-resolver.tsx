import { FieldValues, UseFormRegister } from 'react-hook-form';
import { Question } from '../questions/checkout';
import clsx from 'clsx';

interface QuestionResolverProps {
  register: UseFormRegister<FieldValues>;
  questions: Question[];
  sliceQuestions?: {
    start?: number;
    end?: number;
  };
}

export default function QuestionResolver(props: QuestionResolverProps) {
  const { questions, register, sliceQuestions } = props;
  const { start, end } = sliceQuestions ?? { start: 0, end: questions.length };
  return (
    <>
      {questions
        .slice(start, end)
        .map(({ name, type, displayLabel, span2Cols, options, value }, i) => {
          if (type === 'select') {
            return (
              <select
                key={name}
                placeholder={displayLabel}
                {...register(`address.${name}`)}
              >
                <option hidden>{displayLabel}</option>
                {options?.map(({ value, label }) => (
                  <option key={`${label}.${value}`} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            );
          }

          if (type === 'singleCheckbox') {
            return (
              <div key={name} className='flex items-center'>
                <input
                  type='checkbox'
                  id={name}
                  value={value}
                  {...register(`address.${name}`)}
                />
                <label htmlFor={name} className='ml-2'>
                  {displayLabel}
                </label>
              </div>
            );
          }

          return (
            <input
              key={name}
              type={type}
              placeholder={displayLabel}
              {...register(`address.${name}`)}
              className={clsx(span2Cols ? 'col-span-2' : 'col-span-1')}
            />
          );
        })}
    </>
  );
}
