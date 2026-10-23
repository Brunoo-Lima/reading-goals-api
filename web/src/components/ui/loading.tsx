import { Spinner } from './spinner';

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner className="size-12 text-primary" />
    </div>
  );
};
