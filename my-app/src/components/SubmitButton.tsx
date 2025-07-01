import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, className = "" }) => {
  return (
    <div className={`w-full bg-white py-6 flex justify-center ${className}`}>
      <button
        onClick={onClick}
        className="bg-brand-primary-blue hover:bg-brand-navy active:bg-black text-white px-10 py-3 rounded-full text-button transition-all duration-150"
      >
        Execute Health Agent Analysis
      </button>
    </div>
  );
};

export default SubmitButton;