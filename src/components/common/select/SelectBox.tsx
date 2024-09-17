export interface Option {
  id: string;
  name: string;
}

interface SelectBoxProps<T extends Option> {
  options: T[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SelectBox = <T extends Option>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
}: SelectBoxProps<T>) => {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2 px-3 bg-white border border-gray-300 rounded-lg appearance-none pr-8 focus:outline-none"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.id}
            className="text-slate-700 hover:bg-light font-normal"
          >
            {option.name}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default SelectBox;
