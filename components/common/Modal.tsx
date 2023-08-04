import Image from 'next/image';
import { useRef, useState } from 'react';
import { useOutsideClick } from '@/utils/hooks';
import { Close } from '@/components/Icons';

interface ModalProps {
  isVisible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  isTitleBorder?: boolean;
  width?: string;
  modalColor?: string;
  outerCloseButton?: boolean;
  clickOutSideToClose?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  children,
  onClose,
  title,
  isTitleBorder = true,
  width = 'lg:w-[440px] w-full',
  modalColor = 'bg-white',
  outerCloseButton = false,
  clickOutSideToClose = false,
}) => {
  const clickOutside = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(true);

  useOutsideClick(clickOutside, onClose);
  if (!isVisible) return null;
  return (
    <div
      className={`fixed top-0 left-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-[100] w-screen h-screen backdrop-blur`}
    >
      {outerCloseButton && (
        <button
          onClick={() => onClose()}
          className="text-black close-modal absolute lg:right-10 right-1 lg:top-10 top-1 p-3 rounded-xl bg-black z-[10]"
          onMouseEnter={() => setActive(false)}
          onMouseLeave={() => setActive(true)}
        >
          <Close active={active} />
        </button>
      )}
      <div
        className={`${width} ${modalColor} rounded-lg py-4 overflow-y-scroll`}
        ref={clickOutSideToClose ? clickOutside : null}
      >
        <div className="flex items-center justify-between px-6 pb-4">
          <h1 className="text-xl leading-8 font-semibold text-black">
            {title}
          </h1>
          {!outerCloseButton && (
            <button onClick={() => onClose()}>
              <Image
                height={14}
                width={14}
                src="/common/close.svg"
                alt="close"
              />
            </button>
          )}
        </div>
        <div
          className={`${isTitleBorder && 'border-b border-lightBeerus'} `}
        ></div>
        {children}
      </div>
    </div>
  );
};
