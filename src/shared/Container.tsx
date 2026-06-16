import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;  
}

export const Container = ({ children, className = "",  }: ContainerProps) => {
  

  return (
    <div className={`mx-auto px-4 max-w-[1240px] ${className}`}>
      {children}
    </div>
  );
};