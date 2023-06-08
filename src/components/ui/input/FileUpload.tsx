export const FileUpload: React.FC<{
  className?: string;
  'data-cy'?: string;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  accept?: string;
  required?: boolean;
}> = ({
  className,
  'data-cy': dataCy,
  handleFileChange,
  label,
  accept,
  required,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={label}
          className={`inline-flex items-center justify-center h-4 p-4 duration-150 rounded-md bg-slate-700 text-slate-200 hover:text-white hover:bg-slate-600 ${className}`}
        >
          {label}
        </label>
      )}
      <input
        className='hidden'
        type='file'
        id={label ?? ''}
        data-cy={dataCy}
        onChange={(e) => handleFileChange(e)}
        accept={accept ?? 'image/jpeg, audio/wav'}
        required={required ?? false}
      />
    </div>
  );
};
