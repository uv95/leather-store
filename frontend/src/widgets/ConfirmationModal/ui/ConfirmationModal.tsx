import ButtonRedesigned from '../../../shared/ui/Button/Button';
import Modal from '../../../shared/ui/Modal/Modal';
import './confirmationModal.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmAction: () => void;
  text: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  text,
  confirmAction,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <p>{text}</p>
        <div className="confirmationModal-buttons">
          <ButtonRedesigned
            className="cm-button-long"
            onClick={() => {
              confirmAction();
              onClose();
            }}
          >
            Yes
          </ButtonRedesigned>
          <ButtonRedesigned onClick={onClose}>No</ButtonRedesigned>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmationModal;
