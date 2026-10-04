import { Modal as MantineModal } from '@mantine/core'

function Modal({ open, onClose, children, title, size = 'md' }) {
  return (
    <MantineModal
      opened={open}
      onClose={onClose}
      title={title}
      size={size}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      radius="md"
    >
      {children}
    </MantineModal>
  )
}

export default Modal
