import React from "react";

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div className={`p-4 h-full${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default CardBody;
