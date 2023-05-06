import * as Separator from '@radix-ui/react-separator';

export const Divider: React.FC<{ heading: string; subheading?: string }> = ({
  heading,
  subheading,
}) => {
  return (
    <div>
      <h1 className='text-3xl font-bold select-none'>{heading}</h1>
      <h2 className='select-none text-slate-300'>{subheading}</h2>
      <Separator.Root
        className='h-[1px] my-4 bg-slate-700'
        decorative
        orientation='vertical'
      />
    </div>
  );
};
