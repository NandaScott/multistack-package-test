import { joiResolver } from "@hookform/resolvers/joi";
import { useCallback, useState, useRef } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import { validationSchema } from "../questions";

interface Config {
  pageIds: Array<string | number>
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  pageSkips?: () => string | number | undefined;
  hookFormConfig?: UseFormProps,
  debugValidation?: boolean,
}

export const useMIP = (config: Config) => {
  const { pageIds, pageSkips, hookFormConfig, onNext, onBack, onSubmit, debugValidation } = config;
  const [currentPage, setCurrentPage] = useState<number | string>(pageIds[0]);
  const { formState, ...rest } = useForm({
    mode: 'onBlur',
    resolver: async (data, context, options) => {
      const config = {
        context: {
          currentPage: 'address'
        },
        messages: {
          'string.empty': 'Required.',
          'string.email': 'Must be a valid email.',
          'any.invalid': 'Please select an option.',
        }
      }
      if (debugValidation) {
        console.log('formData', data)
        console.log('validation result', await joiResolver(validationSchema, config)(data, context, options))
      }
      return joiResolver(validationSchema, config)(data, context, options)
    },
    shouldUseNativeValidation: false,
    ...hookFormConfig
  });
  const pages = useRef<Array<string | number>>(pageIds)
  const pageHistory = useRef<Array<string | number>>([pageIds[0]])
  const isFirstPage = useRef<boolean>(true);
  const isLastPage = useRef<boolean>(false);
  const currentStep = useRef<number>(0);

  const nextPage = useCallback(() => {
    const { errors, isValid } = formState;
    console.log({ errors, isValid })
    if (!isValid) return;

    isFirstPage.current = false;
    const currentPageIndex = pageIds.indexOf(currentPage) + 1;

    let nextPageId = pages.current[Math.min(currentPageIndex, pageIds.length - 1)];
    const skipTo = pageSkips?.()
    if (skipTo !== undefined) {
      nextPageId = skipTo
    }
    pageHistory.current.push(nextPageId)

    const nextPageIndex = pageIds.indexOf(nextPageId);
    currentStep.current = nextPageIndex;
    if (nextPageIndex + 1 === pages.current.length) {
      isLastPage.current = true;
    }

    setCurrentPage(nextPageId);
    onNext?.()
  }, [currentPage, pageIds, pageSkips, onNext, formState]);

  const previousPage = useCallback(() => {
    isLastPage.current = false
    let previousPageId = pageHistory.current[pageHistory.current.length - 2];
    // keeps current page from going undefined
    if (previousPageId === undefined) {
      previousPageId = pages.current[0]
    }
    if (previousPageId === pages.current[0]) {
      isFirstPage.current = true
    }

    pageHistory.current.pop()
    // prevents pageHistory from being empty
    if (pageHistory.current.length === 0) {
      pageHistory.current.push(pages.current[0])
    }

    currentStep.current = pages.current.indexOf(previousPageId ?? pages.current[0]);
    setCurrentPage(previousPageId)
    onBack?.()
  }, [onBack])

  const submitForm = useCallback((data: { [x: string]: any }) => {
    const fakeAPI = new Promise((res, rej) => {
      console.log('sending request')
      setTimeout(() => {
        res('success!')
      }, 5000)
    })

    fakeAPI
      .then(() => {
        onSubmit?.()
      })
      .catch(console.error)

  }, [onSubmit])

  return {
    formState,
    ...rest,
    isFirstPage: isFirstPage.current,
    isLastPage: isLastPage.current,
    pages: pages.current,
    currentStep: currentStep.current,
    pageHistory: pageHistory.current,
    currentPage,
    nextPage,
    previousPage,
    submitForm
  }
}