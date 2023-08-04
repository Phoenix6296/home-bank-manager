import { useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

interface InfoTooltipProps {
  message: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  corner?: string;
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  message,
  top,
  left,
  right,
  bottom,
  corner,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative cursor-pointer"
    >
      <div className="text-gray-500 hover:text-gray-800">
        <AiOutlineInfoCircle />
      </div>
      {show ? (
        <div
          className={`${corner} z-50 scale-in-center absolute ${top} ${left} ${right} ${bottom} bg-white p-2 rounded-lg w-40 text-gray-500 text-xs border border-black border-opacity-10 leading-5 text-center`}
        >
          {message}
        </div>
      ) : null}
    </div>
  );
};
