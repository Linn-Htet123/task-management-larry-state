interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  placeholder?: string;
  onClick?: React.MouseEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = ({
  label,
  placeholder,
  onClick,
  onBlur,
  onEnter,
  className,
  ...props
}: TextareaProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
      <textarea
        required
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

export default Textarea;
