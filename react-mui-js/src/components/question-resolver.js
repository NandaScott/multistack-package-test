import { ErrorMessage } from '@hookform/error-message';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import '../App.css';

export default function QuestionResolver(props) {
  const { questions, register, sliceQuestions, errors, pageId, watch } = props;
  const { start, end } = sliceQuestions ?? { start: 0, end: questions.length };
  return (
    <>
      {questions
        .slice(start, end)
        .map(({ name, type, displayLabel, span2Cols, options, value }, i) => {
          if (type === 'select') {
            return (
              <FormControl key={`FormControl-${name}`}>
                <InputLabel key={`InputLabel-${name}`}>
                  {displayLabel}
                </InputLabel>
                <Select
                  {...register(`${pageId}.${name}`)}
                  label={displayLabel}
                  key={`Select-${name}`}
                >
                  {options?.map(({ value, label }) => (
                    <MenuItem key={`MenuItem-${label}-${value}`} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
                  <ErrorMessage
                    key={`error-message-${name}`}
                    errors={errors}
                    name={`${pageId}.${name}`}
                    render={({ message }) => (
                      <FormHelperText key={`FormHelperText-${name}`} error>
                        {message}
                      </FormHelperText>
                    )}
                  />
              </FormControl>
            );
          }

          if (type === 'singleCheckbox') {
            return (
              <FormGroup
                key={`FormGroup-${name}`}
                style={{ justifyContent: 'center' }}
              >
                <FormControlLabel
                  key={`FormControlLabel-${name}`}
                  control={
                    <Checkbox
                      key={`Checkbox-${name}`}
                      {...register(`${pageId}.${name}`)}
                      checked={watch?.(`${pageId}.${name}`)}
                    />
                  }
                  label={displayLabel}
                />
                <ErrorMessage
                  key={`ErrorMessage-${name}`}
                  errors={errors}
                  name={`${pageId}.${name}`}
                  render={({ message }) => (
                    <FormHelperText key={`FormHelperText-${name}`} error>
                      {message}
                    </FormHelperText>
                  )}
                />
              </FormGroup>
            );
          }

          return (
            <FormControl
              key={`FormControl-${name}`}
              variant='outlined'
              className={span2Cols ? 'col-span-2' : 'col-span-1'}
            >
              <InputLabel>{displayLabel}</InputLabel>
              <OutlinedInput
                label={displayLabel}
                type={type}
                {...register(`${pageId}.${name}`)}
              />
              <ErrorMessage
                key={`error-message-${name}`}
                errors={errors}
                name={`${pageId}.${name}`}
                render={({ message }) => (
                  <FormHelperText key={`FormHelperText-${name}`} error>
                    {message}
                  </FormHelperText>
                )}
              />
            </FormControl>
          );
        })}
    </>
  );
}
