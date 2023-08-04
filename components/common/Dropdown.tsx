import { useRef, useState, useMemo, useCallback } from 'react';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { useDebounce, useOutsideClick } from '@/utils/hooks';
import Image from 'next/image';

interface Option {
  [key: string]: any;
}

interface DropdownProps {
  required?: boolean;
  label: string;
  prefixIcon?: string;
  placeholder?: string;
  options: Option[];
  identifier?: string;
  titleIdentifier?: string;
  emptyStateTitle?: string;
  isTypable?: boolean;
  onClick?: (selectedOption: Option | undefined) => void;
  disabled?: boolean;
  containerStyles?: string;
  children?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  required = false,
  label,
  prefixIcon,
  placeholder,
  options = [],
  identifier = 'value',
  titleIdentifier = 'value',
  emptyStateTitle = 'No Items',
  isTypable = false,
  onClick,
  disabled,
  containerStyles = 'w-full ',
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [isValueSelected, setIsValueSelected] = useState(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useOutsideClick(ref, setOpen);
  const debounceInput = useDebounce(searchInput, 300);

  const handleTileClick = useCallback(
    (id: number) => {
      setOpen(false);
      setIsValueSelected(true);
      onClick && onClick(options?.find((option) => option[identifier] === id));
    },
    [onClick, options, identifier]
  );

  const computeFiltered = useMemo(() => {
    if (!open && searchInput) {
      setOpen(true);
    }
    return options.filter(
      (option) =>
        option[titleIdentifier]
          ?.toLowerCase()
          .includes(debounceInput.toLowerCase())
    );
  }, [options, debounceInput, titleIdentifier, open, searchInput]);

  const handleDeselect = useCallback(() => {
    setSearchInput('');
    setIsValueSelected(false);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className={`h-full relative p-0 mb-1 ${containerStyles}`}>
      <label className="mb-2 flex gap-2 items-center">
        {prefixIcon && (
          <Image src={prefixIcon} alt={'Prefix Icon'} width={20} height={20} />
        )}
        {label}
      </label>
      <div
        className={`w-full flex border rounded-lg p-3 mb-2 ${
          disabled && 'opacity-80 cursor-not-allowed bg-gray-100'
        }`}
      >
        <div className="grow relative">
          <div
            className="cursor-pointer absolute z-1 right-0 top-1"
            onClick={isValueSelected ? handleDeselect : handleToggle}
          >
            <p
              className={`transform transition-all ${
                open && !isValueSelected ? 'rotate-180' : ''
              }`}
            >
              {isValueSelected ? <IoMdClose /> : <IoIosArrowDown />}
            </p>
          </div>
          <input
            className="w-[93%] border-none focus:outline-none h-full cursor-pointer"
            value={searchInput}
            placeholder={placeholder}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => !isValueSelected && setOpen((prev) => !prev)}
            readOnly={isValueSelected || !isTypable}
            required={required}
            disabled={disabled}
          />
        </div>
      </div>
      <div ref={ref}>
        {open && !isValueSelected && (
          <div
            className={`p-2 rounded-xl bg-white absolute w-full translate-y-1 z-20 max-h-[200px] overflow-y-auto hide-scroll`}
            style={{
              boxShadow: `0px 8px 24px -6px rgba(0, 0, 0, 0.16), 0px 0px 1px rgba(0, 0, 0, 0.4)`,
            }}
          >
            {computeFiltered.length ? (
              computeFiltered.map((option) => (
                <p
                  key={option[identifier]}
                  onClick={() => {
                    setSearchInput(option[titleIdentifier]);
                    handleTileClick(option[identifier]);
                  }}
                  className="hover:bg-gray-200 cursor-pointer p-2 rounded-lg"
                >
                  {option[titleIdentifier]}
                </p>
              ))
            ) : (
              <div className="py-1 text-center text-sm text-darkTrunks">
                {emptyStateTitle}
              </div>
            )}
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
