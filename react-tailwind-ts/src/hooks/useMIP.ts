import { useCallback, useState, useRef } from "react";
import { useForm, UseFormProps } from "react-hook-form";

interface Config {
  pageIds: Array<string | number>
  onNext?: () => void;
  onBack?: () => void;
  onSubmit?: () => void;
  pageSkips?: () => string | number | undefined;
  hookFormConfig?: UseFormProps
}

export const useMIP = (config: Config) => {
  const { pageIds, pageSkips, hookFormConfig, onNext, onBack, onSubmit } = config;
  const [currentPage, setCurrentPage] = useState<number | string>(pageIds[0]);
  const pages = useRef<Array<string | number>>(pageIds)
  const pageHistory = useRef<Array<string | number>>([pageIds[0]])
  const isFirstPage = useRef<boolean>(true);
  const isLastPage = useRef<boolean>(false);
  const currentStep = useRef<number>(0);

  const nextPage = useCallback(() => {
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
  }, [currentPage, pageIds, pageSkips, onNext]);

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
    ...useForm(hookFormConfig),
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