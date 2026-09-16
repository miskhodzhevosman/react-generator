import './css/Button.css'

function Button({ children, variant = 'default', onClick, type = 'button', ...rest }) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
