
import React from "react";

interface CustomNodeProps {
  id: string;
  data: {
    label: string;
    expanded: boolean;
    onToggle: (id: string) => void;
  };
  isConnectable?: boolean;
}

export const CustomNode: React.FC<CustomNodeProps> = ({ id, data }) => {
  const { label, expanded, onToggle } = data;

  return (
    <div
      style={{
        padding: 10,
        border: "1px solid #ddd",
        borderRadius: 4,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        cursor: "default",
        userSelect: "none",
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(id);
        }}
        style={{
          marginRight: 8,
          cursor: "pointer",
          border: "none",
          background: "transparent",
          fontSize: 16,
          lineHeight: 1,
          userSelect: "none",
        }}
        aria-label={expanded ? "Collapse node" : "Expand node"}
        title={expanded ? "Collapse node" : "Expand node"}
      >
        {expanded ? "−" : "+"}
      </button>
      <div>{label}</div>
    </div>
  );
};