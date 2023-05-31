export const SearchInput: React.FC<{
  className?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  'data-cy'?: string;
}> = ({ className, onChange, 'data-cy': dataCy }) => {
  return (
    <input
      className={`w-64 rounded-full h-8 text-black px-2 ${className}`}
      type='text'
      onChange={(e) => onChange(e.target.value)}
      data-cy={dataCy}
    />
  );
};
