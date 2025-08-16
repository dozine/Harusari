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
        {required && <span className="text-red-500 ml-1"></span>}
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
            bg-gray-200
            text-gray-500
            py-1
            px-2
            block
            w-full
            rounded-3xl
            border-gray-900
            placeholder:text-gray-400
            sm:text-sm
            sm:leading-6
            focus:outline-none
            `,
            !error && "focus:ring-1 focus:ring-orange-600",
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
