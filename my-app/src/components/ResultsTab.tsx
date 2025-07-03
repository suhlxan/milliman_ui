// src/components/ResultsTab.tsx
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const TABS = ['MCID Claims', 'Medical Claims', 'Pharmacy Claims'];

// Replace these with your real API results
const apiData = [
  `MCID result line 1
MCID result line 2`,
  `Medical result line 1
Medical result line 2`,
  `Pharmacy result line 1
Pharmacy result line 2`,
];

export default function ResultsTab() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen]               = useState(false);

  const handleTabChange = (_: any, newIndex: number) => {
    setSelectedTab(newIndex);
    setOpen(true); // auto‐open when switching tabs
  };

  const toggleOpen = () => setOpen(o => !o);

  // Grab just the first line for the header snippet
  const snippet = apiData[selectedTab].split('\n')[0];

  return (
    <Box className="max-w-6xl mx-auto mt-2">
      {/* Tabs */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        className="border-b border-brand-gray-light"
        TabIndicatorProps={{ style: { backgroundColor: '#005BB5', height: 2 } }}
        sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'flex-start' } }}
      >
        {TABS.map((label, idx) => (
          <Tab
            key={label}
            label={label}
            value={idx}
            className={`pb-2 text-h6 transition-colors duration-200 ${
              selectedTab === idx
                ? 'text-brand-blacks font-semibold'
                : 'text-brand-primary-blue hover:text-brand-navy'
            }`}
          />
        ))}
      </Tabs>

      {/* Outer panel (always rendered, with full shape) */}
      <Box className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header strip */}
        <Box className="p-4 flex items-center">
          <IconButton
            size="small"
            onClick={toggleOpen}
            className="text-brand-cyan mr-2"
          >
            {open ? (
              <ExpandMoreIcon fontSize="small" className="text-brand-cyan" />
            ) : (
              <ChevronRightIcon fontSize="small" className="text-brand-cyan" />
            )}
          </IconButton>
          <Typography variant="body1" className="text-gray-700">
            {snippet}
          </Typography>
        </Box>

        {/* Collapsible inner content */}
        <Collapse in={open} unmountOnExit>
          <Box className="p-8 pt-0">
            {apiData[selectedTab]
              .split('\n')
              .map((line, i) => (
                <Typography key={i} variant="body2" className="mb-2">
                  {line}
                </Typography>
              ))}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
}
