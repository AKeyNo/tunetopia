export const SearchInput: React.FC<{
  className?: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}> = ({ className, onChange }) => {
  return (
    <input
      className={`w-64 rounded-full h-8 text-black px-2 ${className}`}
      type='text'
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
