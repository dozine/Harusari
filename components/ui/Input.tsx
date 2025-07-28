"use client";

import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = "text",
  required,
  value,
  onChange,
  error,
  errorMessage,
  disabled,
  ...rest
}) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          value={value}
          onChange={onChange}
          className={clsx(
            `form-input
            block
            w-full
            rounded-md
            border-gray-900
            shadow-sm
            ring-1
            ring-inset
            ring-gray-300
            placeholder:text-gray-400
            focus:ring-2
            focus:ring-inset
            focus:ring-sky-600
            sm:text-sm
            sm:leading-6`,
            error && "focus:ring-rose-500 ring-rose-500",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          {...rest}
        />

        {error && errorMessage && (
          <p className="mt-2 text-sm text-rose-500">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default Input;
