import React from 'react';

interface FormPageProps {
  currentPage: string | number;
  pageId: string | number;
  className?: string;
  children: React.ReactNode;
}

export default function FormPage(props: FormPageProps) {
  const { currentPage, pageId, className, children } = props;

  if (currentPage !== pageId) return null;

  return <div className={className}>{children}</div>;
}
