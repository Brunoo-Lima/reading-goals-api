interface IPageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: IPageContainerProps) => {
  return <section className={`p-6 space-y-8 ${className}`}>{children}</section>;
};
