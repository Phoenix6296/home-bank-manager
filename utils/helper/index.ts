import dayjs from 'dayjs';

export const indianCommaSeperation = (num: number | string): string => {
  // Convert num to a string in case it's a number
  let x = num.toString();
  // Handle negative numbers
  let negative = false;
  if (x.startsWith('-')) {
    negative = true;
    x = x.substring(1); // Remove the negative sign for processing
  }
  // Split the number into whole and decimal parts (if applicable)
  let parts = x.split('.');
  let wholePart = parts[0];
  let decimalPart = parts.length > 1 ? parts[1] : '';
  // Apply the Indian number system comma pattern
  let lastThreeDigits = wholePart.length > 3 ? wholePart.slice(-3) : wholePart;
  let otherDigits = wholePart.slice(0, wholePart.length - 3);
  if (otherDigits !== '') {
    lastThreeDigits = ',' + lastThreeDigits;
  }
  let res = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThreeDigits;
  // Add the decimal part back
  if (decimalPart !== '') {
    res = res + '.' + decimalPart;
  }
  // Add the negative sign back
  if (negative) {
    res = '-' + res;
  }
  return res;
};

export const capitalizeFirstLetter = (text: string) => {
  return text?.charAt(0).toUpperCase() + text?.slice(1);
};

export const getCaretPosition = (
  element: HTMLElement
): { left: number; top: number } => {
  const range = document.getSelection()?.getRangeAt(0);
  if (!range) {
    return { left: 0, top: 0 };
  }
  const clonedRange = range.cloneRange();
  clonedRange.selectNodeContents(element);
  clonedRange.setEnd(range.endContainer, range.endOffset);
  const boundingRect = clonedRange.getBoundingClientRect();
  return { left: boundingRect.right, top: boundingRect.top };
};

export const updatedAgo = (date: Date | string): string => {
  const today = dayjs();
  const updated = dayjs(date);
  const diff = today.diff(updated, 'day');
  if (diff === 0) {
    return 'Today';
  } else if (diff === 1) {
    return 'Yesterday';
  } else return `${diff} days ago`;
};
