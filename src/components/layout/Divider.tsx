import { PropsWithChildren } from 'react';
import * as Separator from '@radix-ui/react-separator';

export const Divider: React.FC<
  PropsWithChildren<{ heading: string; subheading?: string }>
> = ({ children, heading, subheading }) => {
  return (
    <div>
      <h1 className='text-3xl font-bold select-none'>{heading}</h1>
      <h2 className='select-none text-slate-300'>{subheading}</h2>
      <Separator.Root
        className='h-[1px] my-4 bg-slate-700'
        decorative
        orientation='vertical'
      />
      <div className='pb-4'>{children}</div>
    </div>
  );
};
