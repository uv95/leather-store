import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
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
          <Button
            className="cm-button-long"
            onClick={() => {
              confirmAction();
              onClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={onClose}>No</Button>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmationModal;
