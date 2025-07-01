// src/components/TitleBlock.tsx
import React from "react";

interface TitleBlockProps {
  title: string;
  subtitle: string;
}

const TitleBlock: React.FC<TitleBlockProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-10 grid grid-cols-[4px_1fr] gap-4">
      <div className="bg-brand-yellow rounded-md h-full" />
      <div>
        <h1 className="text-[32px] font-bold text-brand-blacks mb-2 leading-[36px]">
          {title}
        </h1>
        <p className="text-brand-gray">{subtitle}</p>
      </div>
    </div>
  );
};

export default TitleBlock;