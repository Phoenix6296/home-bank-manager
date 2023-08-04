import Image from 'next/image';

interface SearchInputProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  onFocus?: () => void;
  containerStyles?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  setValue,
  onFocus,
  containerStyles,
}) => {
  return (
    <div className={`${containerStyles} bg-white rounded-lg relative border`}>
      <Image
        className="absolute left-2 top-1/2 transform -translate-y-1/2"
        src="/common/search.svg"
        alt="search"
        width={20}
        height={20}
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={onFocus}
        type="text"
        placeholder={placeholder}
        className="block w-full py-2 px-4 rounded-lg pl-8 pr-6"
      />
      {value ? (
        <Image
          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={() => setValue('')}
          src={'/common/close.svg'}
          alt="delete"
          width={15}
          height={15}
        />
      ) : null}
    </div>
  );
};
