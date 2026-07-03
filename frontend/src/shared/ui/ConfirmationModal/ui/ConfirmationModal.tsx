import Button from '../../Button/Button';
import Modal from '../../Modal/Modal';
import './confirmationModal.scss';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmAction: () => void;
  title: string;
  buttonTexts: {
    yes: string;
    no: string;
  };
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  confirmAction,
  buttonTexts,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <>
        <h2 className="confirmationModal-title" id="modal-title">
          {title}
        </h2>
        <div className="confirmationModal-buttons">
          <Button onClick={() => onClose()} className="confirmationModal-cancel">
            {buttonTexts.no}
          </Button>
          <Button
            className="cm-button-long"
            onClick={() => {
              confirmAction();
              onClose();
            }}
          >
            {buttonTexts.yes}
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default ConfirmationModal;
