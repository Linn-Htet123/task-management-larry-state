import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Custom onEnter handler
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  onClick,
  onBlur,
  onEnter,
  className,
  ...props
}) => {
  // Handle key down events to trigger onEnter when Enter is pressed
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) {
      onEnter(e);
    }
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        onClick={onClick}
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
