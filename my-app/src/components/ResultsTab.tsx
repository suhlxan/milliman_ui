//components/rrResults.tsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, Collapse, IconButton, Typography, Paper, } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DatasetIcon from '@mui/icons-material/Dataset';
import HealingIcon from '@mui/icons-material/Healing'; // For Diabetes
import ElderlyIcon from '@mui/icons-material/Elderly'; // For Age Group
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms'; // For Smoking
import LiquorIcon from '@mui/icons-material/Liquor'; // For Alcohol
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; // For Blood Pressure

const TABS = ['MCID Claims', 'Medical Claims', 'Pharmacy Claims'];


const apiData = [
  `{
    "src_mbr_first_nm":"[MASKED_NAME]"
    "src_mbr_last_nm":"[MASKED_NAME]"
    "src_mbr_mid_init_nm":NULL
    "src_mbr_age":0
    "src_mbr_zip_cd":"12345"
    "medical_claims_data":{
    "REQUESTID":"77554079"
    "MESSAGE":"User not found"
    "MEDICAL_CLAIMS":[]
    }
    "original_structure_preserved":true
    "deidentification_timestamp":"2025-07-04T07:04:14.479810"
    "data_type":"medical_claims"
    }`,
  `Medical result line 1\nMedical result line 2`,
  `Pharmacy result line 1\nPharmacy result line 2`,
];

export default function ResultsTab() {
  const [claimsOpen, setClaimsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [claimsExtractionOpen, setClaimsExtractionOpen] = useState(false); // State for Claims Data Extraction
  const [extractionTab, setExtractionTab] = useState(0); // 0 = Medical, 1 = Pharmacy
  const [entityExtractionOpen, setEntityExtractionOpen] = useState(false);
  const [healthTrajectoryOpen, setHealthTrajectoryOpen] = useState(false);
  const [finalSummaryOpen, setFinalSummaryOpen] = useState(false);
  const [heartRiskOpen, setHeartRiskOpen] = useState(false);

  const toggleClaimsOpen = () => setClaimsOpen((prev) => !prev);
  const togglePanelOpen = () => setPanelOpen((prev) => !prev);

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setSelectedTab(newIndex);
    setPanelOpen(true); // auto-open panel when switching tabs
  };

  const snippet = apiData[selectedTab].split('\n')[0];

  return (
    <Box className="max-w-6xl mx-auto mt-4">
      {/* Claims Data Header */}
      <Box className="bg-white p-2 rounded-2xl shadow-lg " display="flex" alignItems="center" onClick={toggleClaimsOpen} sx={{ cursor: 'pointer' }}>
        <IconButton size="small" className="text-brand-cyan mr-2">
          {claimsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
        <DescriptionIcon sx={{ fontSize: 24, color: 'f7c59f' , marginRight: 1 }} />
        <Typography variant="h6" className="font-semibold text-brand-mediumBlue hover:text-brand-primary-blue transition-colors duration-200">
          Claims Data
        </Typography>

      </Box>

      {/* Collapsible Claims Section */}
      <Collapse in={claimsOpen} unmountOnExit>
        <Box mt={3}>
          {/* <Typography variant="h6" className="mb-2 text-brand-navy pb-2">
            Deidentified Claims Data
          </Typography> */}

          <Paper elevation={2} className="p-4 rounded-xl">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              {TABS.map((label, index) => (
                <Tab
                  key={label}
                  label={label}
                  value={index}
                  sx={{ '&:hover': { backgroundColor: 'white', color: '#1355E9', transition: 'all 0.3s ease', }, }}
                />
              ))}

            </Tabs>

            {/* Collapsible Panel for Tab Content */}
            <Box className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden">
              <Box className="p-4 flex items-center">
                <IconButton
                  size="small"
                  onClick={togglePanelOpen}
                  className="text-brand-cyan mr-2"
                >
                  {panelOpen ? (
                    <ExpandMoreIcon fontSize="small" className="text-brand-cyan" />
                  ) : (
                    <ChevronRightIcon fontSize="small" className="text-brand-cyan" />
                  )}
                </IconButton>
                <Typography variant="body1" className="text-gray-700">
                  {snippet}
                </Typography>
              </Box>

              <Collapse in={panelOpen} unmountOnExit>
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
          </Paper>
        </Box>
      </Collapse>
      
      {/* Claims Data Extraction Header */}
      <Box mt={6}>
        <Box className="bg-white p-2 rounded-2xl shadow-lg" display="flex" alignItems="center" onClick={() => setClaimsExtractionOpen(prev => !prev)} sx={{ cursor: 'pointer' }} >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {claimsExtractionOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <DatasetIcon sx={{ fontSize: 24, color: '#1e90ff', marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
            Claims Data Extraction
          </Typography>
        </Box>

        {/* Collapsible Content */}
        <Collapse in={claimsExtractionOpen} unmountOnExit>
          <Box mt={3}>
            <Tabs
              value={extractionTab}
              onChange={(_, newValue) => setExtractionTab(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Medical Claims Extraction"
                sx={{ '&:hover': { backgroundColor: '#white', color: '#1355E9', transition: 'all 0.3s ease', }, }}
              />
              <Tab label="Pharmacy Claims Extraction"
                sx={{ '&:hover': { backgroundColor: '#white', color: '#1355E9', transition: 'all 0.3s ease', }, }}
              />
            </Tabs>

            {/* Medical Claims Extraction Summary */}
            {extractionTab === 0 && (
              <Box mt={4}>
                <Typography variant="h6" className="mb-4 text-brand-navy">
                  Medical Claims Extraction Summary
                </Typography>
                <Box display="flex" gap={4} flexWrap="wrap" mt={2}>
                  {/* <Paper elevation={2} className="p-4 rounded-lg min-w-[300px] text-center"> */}
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">Health Service Records</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">Diagnosis Codes</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">Unique Service Codes</Typography>
                  </Paper>
                </Box>
              </Box>
            )}
            {/* Pharmacy Claims Extraction Summary */}
            {extractionTab === 1 && (
              <Box mt={4}>
                <Typography variant="h6" className="mb-4 text-brand-navy">
                  Pharmacy Claims Extraction Summary
                </Typography>
                <Box display="flex" gap={4} flexWrap="wrap" mt={2}>
                <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">NDC Records</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">Unique NDC Codes</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">0</Typography>
                    <Typography variant="body2" className="text-gray-600">Unique Medications</Typography>
                  </Paper>
                </Box>
              </Box>
            )}
          </Box>
        </Collapse>
      </Box>
      {/* Enhanced Entity Extraction Section */}
      <Box mt={6}>
        <Box className="bg-white p-2 rounded-2xl shadow-lg "
          display="flex"
          alignItems="center"
          onClick={() => setEntityExtractionOpen(prev => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {entityExtractionOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
         
          <PrecisionManufacturingIcon sx={{ fontSize: 24, color: '#1E58AA', marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
            Enhanced Entity Extraction
          </Typography>

        </Box>

        <Collapse in={entityExtractionOpen} unmountOnExit>
          <Box mt={3} display="flex" gap={4} flexWrap="wrap">
            {[
              { label: 'Diabetes', value: 'NO', icon: <HealingIcon sx={{ color: '#d81b60', mr: 1 }} /> },
              { label: 'Age Group', value: 'UNKNOWN', icon: <ElderlyIcon sx={{ color: '#6d4c41', mr: 1 }} /> },
              { label: 'Smoking', value: 'NO', icon: <SmokingRoomsIcon sx={{ color: '#607d8b', mr: 1 }} /> },
              { label: 'Alcohol', value: 'NO', icon: <LiquorIcon sx={{ color: '#673ab7', mr: 1 }} /> },
              { label: 'Blood Pressure', value: 'UNKNOWN', icon: <MonitorHeartIcon sx={{ color: '#e53935', mr: 1 }} /> },
            ].map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                className="p-4 rounded-lg min-w-[300px] text-center"
                sx={{
                  p: 4, // padding
                  borderRadius: 2,
                  minWidth: 350, // increased from 300
                  minHeight: 160, // optional: gives more vertical space
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                  {item.icon}
                  <Typography variant="h6" className="font-bold text-brand-navy">
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="body2" className="text-gray-600">
                  {item.value}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Collapse>

      </Box>
      {/* Health Trajectory Section */}
      <Box mt={6}>
        <Box
          className="bg-white p-2 rounded-2xl shadow-lg"
          display="flex"
          alignItems="center"
          onClick={() => setHealthTrajectoryOpen((prev: boolean) => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {healthTrajectoryOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <TrendingUpIcon sx={{ fontSize: 24, color: '#9C27B0' , marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
            Health Trajectory
          </Typography>

        </Box>

        <Collapse in={healthTrajectoryOpen} unmountOnExit>
          <Box mt={3} className="bg-white p-6 rounded-xl shadow-md">
            <Typography variant="body2" className="mb-2">
              Based on the provided de-identified claims data, a comprehensive analysis of the patient's health trajectory is conducted across seven key areas.
            </Typography>
            <Typography variant="body2" className="mb-2">
              <strong>Current Health Status:</strong> No medical or pharmacy claims found. The patient is not diabetic, does not smoke, and does not consume alcohol. Age group and blood pressure status are unknown.
            </Typography>
            <Typography variant="body2">
              <strong>Risk Factors:</strong> No ICD-10 codes or medication patterns available. Some lifestyle indicators suggest absence of smoking and alcohol use.
            </Typography>
          </Box>
        </Collapse>
      </Box>
      {/* Final Summary Section */}
      <Box mt={6}>
        <Box
          className="bg-white p-2 rounded-2xl shadow-lg"
          display="flex"
          alignItems="center"
          onClick={() => setFinalSummaryOpen((prev: boolean) => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {finalSummaryOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <SummarizeIcon sx={{ fontSize: 24, color: '#009688', marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
            Final Summary
          </Typography>

        </Box>

        <Collapse in={finalSummaryOpen} unmountOnExit>
          <Box mt={3} className="bg-white p-6 rounded-xl shadow-md">
            <Typography variant="body2" className="mb-2">
              The patient's current health status is unclear due to missing claims data.
            </Typography>
            <Typography variant="body2" className="mb-2">
              No major risk factors identified, but age and blood pressure are unknown.
            </Typography>
            <Typography variant="body2">
              A full health assessment and updated demographic data are recommended.
            </Typography>
          </Box>
        </Collapse>
      </Box>
      {/* Heart Attack Risk Prediction Section */}
      <Box mt={6}>
        <Box
          className="bg-white p-2 rounded-2xl shadow-lg"
          display="flex"
          alignItems="center"
          onClick={() => setHeartRiskOpen((prev: boolean) => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {heartRiskOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
           ❤️ Heart Attack Risk Prediction
          </Typography>
        </Box>

        <Collapse in={heartRiskOpen} unmountOnExit>
          <Box mt={3} className="bg-white p-6 rounded-xl shadow-md text-center">
            <Typography
              variant="h6"
              sx={{
                color: '#1e40af',
                // borderBottom: '2px solid #3b82f6',
                display: 'inline-block',
                paddingBottom: '6px',
                marginBottom: '16px',
              }}
            >
              Heart Attack Risk Assessment
            </Typography>

            <Box
              className="p-4 rounded-lg mt-2 text-center"
              sx={{
                backgroundColor: '#fee6ea',
                borderLeft: '6px solid #fbb5bf',
                textAlign: 'left',
              }}
            >
              <Typography variant="body1" className="font-semibold text-brand-navy">
                Heart Disease Risk: 39.0% (Low Risk) | Confidence: 39.0%
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

    </Box>
  );
}
