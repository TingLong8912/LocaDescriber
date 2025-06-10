import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ControllModal: React.FC<ModalProps> = ({ open, onClose, title, children, className }) => {
  if (!open) return null;
  return (
    <div className={`absolute -top-30 left-1/2 transform -translate-x-1/2 w-80 h-30 bg-background/60 backdrop-blur-sm border p-4 rounded shadow-md z-50 ${className || ""}`}>
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};