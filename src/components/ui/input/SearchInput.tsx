export const SearchInput: React.FC<{
  className?: string;
  label?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  'data-cy'?: string;
  required?: boolean;
  value?: string;
}> = ({ className, onChange, 'data-cy': dataCy, label, required, value }) => {
  return (
    <div>
      {label && <label className='block text-slate-300'>{label}</label>}
      <input
        className={`w-64 rounded-full h-8 text-black px-2 ${className}`}
        type='text'
        onChange={(e) => onChange(e.target.value)}
        data-cy={dataCy}
        required={required ?? false}
        value={value}
      />
    </div>
  );
};
