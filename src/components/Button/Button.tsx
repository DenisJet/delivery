import styles from './Button.module.css';

export default function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) {
  return (
    <button type='button' className={`${styles.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
