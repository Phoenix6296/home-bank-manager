import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FILE_TYPES } from '@/utils/constants';

interface FileInputProps {
  file: File | null;
  setFile: (file: File | null) => void;
  onChange: (file: File) => void;
  label: string;
  containerStyles?: string;
}

export const FileInput: React.FC<FileInputProps> = ({
  file,
  setFile,
  onChange,
  label,
  containerStyles,
}) => {
  const [fileURL, setFileURL] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      setFileURL(URL.createObjectURL(file));
    } else {
      setFileURL(null);
    }
  }, [file]);

  return (
    <div className={`${containerStyles} relative`}>
      {fileURL ? (
        <button
          onClick={() => {
            setFile && setFile(null);
            setFileURL(null);
          }}
          type="button"
          className="absolute top-4 h-10 w-10 flex items-center justify-center right-0 z-10 hover:shadow-lg rounded-lg"
        >
          <Image src="/common/delete.svg" alt="delete" height={17} width={17} />
        </button>
      ) : null}
      <FileUploader
        multiple={false}
        handleChange={onChange}
        name="file"
        types={FILE_TYPES}
        label={'Upload Icon'}
        fileOrFiles={file}
        file={file}
      >
        <div className="mt-6 relative z-0">
          <div className="mb-2 flex-inline items-center justify-between relative">
            <p>{label}</p>
          </div>
          <div className="border border-black border-opacity-10 py-10 flex justify-center items-center flex-col rounded-lg">
            <Image
              src={file ? '/common/excel_logo.svg' : '/common/upload.png'}
              alt="upload"
              height={150}
              width={150}
            />
          </div>
        </div>
      </FileUploader>
    </div>
  );
};
