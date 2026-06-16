interface ITitlePageProps {
  children: React.ReactNode;
  className?: string;
}

export const HeaderPage = ({ children, className }: ITitlePageProps) => {
  return (
    <div className={`flex justify-between gap-4 mb-6 ${className}`}>
      {children}
    </div>
  );
};

interface ITitlePageProps {
  children: React.ReactNode;
  className?: string;
}

export const TitlePage = ({ children, className }: ITitlePageProps) => {
  return <h1 className={`text-2xl font-bold ${className}`}>{children}</h1>;
};

interface IDescriptionPageProps {
  children: React.ReactNode;
  className?: string;
}

export const DescriptionPage = ({
  children,
  className,
}: IDescriptionPageProps) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
  );
};

interface IContentPageProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentPage = ({ children, className }: IContentPageProps) => {
  return <div className={`${className}`}>{children}</div>;
};
