// src/components/ResultsTab.tsx
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

const labels = ['MCID Claims', 'Medical Claims', 'Pharmacy Claims'];

export default function ResultsTab() {
  const [value, setValue] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      className="border-b border-brand-gray-light mb-6"
      TabIndicatorProps={{ style: { backgroundColor: '#005BB5', height: '2px' } }}
      variant="scrollable" // if you have many tabs; optional
      scrollButtons="auto"
    >
      {labels.map((label, idx) => (
        <Tab
          key={label}
          label={label}
          className={`pb-2 text-h6 transition-colors duration-200 ${
            value === idx
              ? 'text-brand-blacks font-semibold'
              : 'text-brand-primary-blue hover:text-brand-blacks'
          }`}
        />
      ))}
    </Tabs>
  );
}
