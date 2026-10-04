import { Button as MantineButton } from '@mantine/core'

function Button({ children, variant = 'default', onClick, type = 'button', ...rest }) {
  return (
    <MantineButton
      type={type}
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {children}
    </MantineButton>
  )
}

export default Button
