export default function Button({ onClick, label, className = '', type = 'button', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.btn} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}