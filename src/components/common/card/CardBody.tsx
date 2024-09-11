import React from "react";

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = "" }) => {
  return <div className={`p-4 h-full${className}`}>{children}</div>;
};

export default CardBody;
