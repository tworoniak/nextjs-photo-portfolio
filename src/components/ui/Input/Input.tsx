import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={clsx(styles.wrapper, error && styles.hasError, className)}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {props.required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={styles.input}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-invalid={!!error}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
