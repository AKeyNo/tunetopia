import * as Separator from '@radix-ui/react-separator';

export const SongHeaderRow: React.FC = () => {
  return (
    <div>
      <div className='flex items-center h-12 p-4 text-lg duration-75 select-none gap-x-4 text-slate-300'>
        <div>
          <span>#</span>
        </div>
        <div>
          <span>Title</span>
        </div>
      </div>
      <Separator.Root
        className='h-[1px] mt-0 mb-4 bg-slate-700'
        decorative
        orientation='vertical'
      />
    </div>
  );
};
