import { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./TextArea.module.scss";
import clsx from "clsx";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, id, className, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={clsx(styles.wrapper, error && styles.hasError, className)}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {props.required && <span className={styles.required} aria-hidden="true"> *</span>}
        </label>
        <textarea
          ref={ref}
          id={inputId}
          className={styles.textarea}
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

TextArea.displayName = "TextArea";
export default TextArea;
