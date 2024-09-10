interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className = "", onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`text-white px-4 py-2 rounded-lg hover:opacity-80 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
