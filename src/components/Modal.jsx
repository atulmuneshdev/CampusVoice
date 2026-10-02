import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import Button from './Button';

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  hideCloseButton = false,
  maxWidth = 'max-w-lg',
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            className={`relative w-full ${maxWidth} glass rounded-3xl shadow-2xl shadow-navy-900/15 overflow-hidden`}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {(title || !hideCloseButton) && (
              <div className="flex items-center justify-between px-6 pt-6">
                {title && (
                  <h2
                    id="modal-title"
                    className="text-xl font-bold text-navy-900"
                  >
                    {title}
                  </h2>
                )}
                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="w-9 h-9 rounded-xl hover:bg-navy-100 flex items-center justify-center text-navy-500 transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className={`${title || !hideCloseButton ? 'p-6 pt-4' : 'p-6'}`}>
              {children}
            </div>
            {footer && (
              <div className="px-6 pb-6 pt-2 border-t border-navy-100 flex items-center justify-end gap-3">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmVariant = 'danger',
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      {message && <p className="text-navy-600">{message}</p>}
      <div className="flex justify-end gap-3 mt-6">
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
