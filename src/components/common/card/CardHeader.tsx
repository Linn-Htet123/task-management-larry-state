import React from "react";

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

export default CardHeader;
