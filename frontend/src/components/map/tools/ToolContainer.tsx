import React from "react";

interface ToolContainerProps {
  children: React.ReactNode;
}

const ToolContainer: React.FC<ToolContainerProps> = ({ children }) => {
  return (
    <div className="w-fit h-15 relative bottom-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-x-3 z-50">
      {children}
    </div>
  );
};

export default ToolContainer;