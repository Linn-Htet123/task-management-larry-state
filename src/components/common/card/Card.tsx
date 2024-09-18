import React from "react";
import CardHeader from "./CardHeader";
import CardTitle from "./CardTitle";
import CardBody from "./CardBody";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className = "",
  onClick,
}) => {
  return (
    <div className={`bg-white rounded-lg${className}`}>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardBody onClick={onClick}>{children}</CardBody>
    </div>
  );
};

export default Card;
