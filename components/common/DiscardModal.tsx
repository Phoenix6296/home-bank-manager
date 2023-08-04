import { Button, Modal } from './';

interface DiscardModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DiscardModal: React.FC<DiscardModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal title={'Confirm Discard'} isVisible={isVisible} onClose={onClose}>
      <div className="text-center p-4">
        <p className="font-semibold mb-1">Do you want to discard process?</p>
        <p>
          Discarding will cause you to lose the data that you just uploaded.
        </p>
      </div>
      <div className="p-4 border-t border-black border-opacity-10 flex gap-2 justify-end">
        <div>
          <Button
            onClick={() => onClose()}
            type={'button'}
            px="px-4"
            title={'Cancel'}
          />
        </div>
        <div>
          <Button
            onClick={() => onConfirm()}
            color="bg-primary text-white"
            type={'button'}
            px="px-4"
            title="Discard"
          />
        </div>
      </div>
    </Modal>
  );
};
