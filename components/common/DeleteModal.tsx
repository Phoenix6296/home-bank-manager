import React, { useCallback } from 'react';
import { Button, Modal } from './';

interface DeleteModalProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onClick?: () => void;
  onClose?: () => void;
  loading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  setShow,
  title,
  onClick,
  onClose,
  loading = false,
}) => {
  const handleClose = useCallback(() => {
    onClose && onClose();
    setShow(false);
  }, [setShow, onClose]);

  return (
    <Modal title={`Delete ${title}`} isVisible={show} onClose={handleClose}>
      <div className="text-center p-6">
        <p className="font-semibold mb-3">
          {`Do you want to delete this ${title}?`}
        </p>
        <p className="w-4/5 mx-auto">{`Deleting this ${title.toLowerCase()}  will cause the loss of all data associated with
          it.`}</p>
      </div>
      <div className="flex gap-2 justify-end w-full border-t border-black border-opacity-10 pt-4 px-4">
        <div>
          {!loading && (
            <Button
              onClick={handleClose}
              type="button"
              px="px-4"
              py="py-2"
              fontSize="text-sm"
              title="Discard"
            />
          )}
        </div>
        <div>
          <Button
            onClick={() => {
              onClick && onClick();
            }}
            type="submit"
            color="bg-red text-white"
            px="px-4"
            py="py-2"
            fontSize="text-sm"
            title="Delete"
            loading={loading}
          />
        </div>
      </div>
    </Modal>
  );
};
