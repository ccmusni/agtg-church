import { Button, FlowbiteColors, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type TPopupModalProps = {
  open: boolean;
  message: string;
  onSubmit: () => void;
  submitLabel?: string;
  submitColor?: "info" | "failure" | "success" | "warning";

  onCancel?: () => void;
  cancelLabel?: string;
  onClose: () => void;
};

export default function PopupModal({
  open,
  message,
  onSubmit,
  submitLabel = `Yes, I'm sure`,
  submitColor = "info",
  onCancel = () => {},
  cancelLabel = "No, cancel",
  onClose,
}: TPopupModalProps) {
  const handleSubmit = () => {
    onSubmit();
    handleClose();
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal show={open} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {message}
            </h3>
            <div className="flex justify-center gap-4">
              <Button color={submitColor} onClick={handleSubmit}>
                {submitLabel}
              </Button>
              <Button color="gray" onClick={handleCancel}>
                {cancelLabel}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
