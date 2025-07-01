// src/components/ResultsTab.tsx
import React, { useState } from "react";

const tabs = ["MCID", "Medical Claims", "Pharmacy Claims"];

const ResultsTab: React.FC = () => {
    const [selected, setSelected] = useState("MCID");

    return (
        <div className="border-b border-brand-gray-light mb-6">
            <div className="flex gap-8">
                {tabs.map((tab)=> {
                    const isSelected = selected === tab;
                    return (
                        <button
                            key={tab}
                            onClick={() => setSelected(tab)}
                            className={`pb-2 text-h6 transition-colors duration-200 ${
                                isSelected
                                ? "text-brand-blacks font-semibold border-b-2 border-brand-blacks"
                                : "text-brand-primary-blue hover:text-brand-blacks hover:border-brand-blacks border-b-2 border-transparents"
                            }`}
                        > 
                          {tab}
                        </button>    
                    );
                })}
            </div>
        </div>
    )
};

export default ResultsTab