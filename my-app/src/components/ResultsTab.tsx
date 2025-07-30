import React, { useState } from 'react';
import { Box, Tabs, Tab, Collapse, IconButton, Typography, Paper, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SummarizeIcon from '@mui/icons-material/Summarize';
import DatasetIcon from '@mui/icons-material/Dataset';
import HealingIcon from '@mui/icons-material/Healing'; 
import ElderlyIcon from '@mui/icons-material/Elderly'; 
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms'; 
import LiquorIcon from '@mui/icons-material/Liquor'; 
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'; 
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Props {
  analysisResults: {
    deidentified_data: {
      mcid: { mcid_claims_data: any };
      medical: { medical_claims_data: any };
      pharmacy: { pharmacy_claims_data: any };
    };
    structured_extractions?: {
      medical?: {
        extraction_summary?: {
          total_hlth_srvc_records?: number;
          total_diagnosis_codes?: number;
          unique_service_codes?: string[];
        };
      };
      pharmacy?: {
        extraction_summary?: {
          total_ndc_records?: number;
          unique_ndc_codes?: string[];
          unique_label_names?: string[];
        };
      };
    };
    medical_extraction?: any;
    pharmacy_extraction?: any;
    entity_extraction?: any;
    health_trajectory?: string;
    final_summary?: string;
    heart_attack_prediction?: {
      combined_display: string;
    };
  };
}

export default function ResultsTab({ analysisResults }: Props) {
  const [claimsOpen, setClaimsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [claimsExtractionOpen, setClaimsExtractionOpen] = useState(false);
  const [extractionTab, setExtractionTab] = useState(0);
  const [entityExtractionOpen, setEntityExtractionOpen] = useState(false);
  const [healthTrajectoryOpen, setHealthTrajectoryOpen] = useState(false);
  const [finalSummaryOpen, setFinalSummaryOpen] = useState(false);
  const [heartRiskOpen, setHeartRiskOpen] = useState(false);
  const [isClaimsHovered, setIsClaimsHovered] = useState(false);

  const TABS = ['MCID Claims', 'Medical Claims', 'Pharmacy Claims'];
  const tabKeys = ['mcid', 'medical', 'pharmacy'];

  const apiData: { [key: string]: any } = {
    mcid: analysisResults.deidentified_data?.mcid || {},
    medical: analysisResults.deidentified_data?.medical || {},
    pharmacy: analysisResults.deidentified_data?.pharmacy || {}
  };

  const extractionSummary = {
    medical: analysisResults.structured_extractions?.medical?.extraction_summary || {},
    pharmacy: analysisResults.structured_extractions?.pharmacy?.extraction_summary || {}
  };

  const entities = analysisResults.entity_extraction || {};
  const heartRisk = analysisResults.heart_attack_prediction?.combined_display || '';
  const finalSummary = analysisResults.final_summary || '';
  const trajectory = analysisResults.health_trajectory || '';

  const toggleClaimsOpen = () => setClaimsOpen((prev) => !prev);
  const togglePanelOpen = () => setPanelOpen((prev) => !prev);

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setSelectedTab(newIndex);
    setPanelOpen(true);
  };

  //const snippet = apiData[selectedTab].split('\n')[0];

  return (
    <Box className="max-w-6xl mx-auto mt-4">
      {/* Claims Data Header */}
      <Box
        className="bg-white p-2 rounded-2xl shadow-lg"
        display="flex"
        alignItems="center"
        onClick={() => {
          setClaimsOpen((prev) => {
            const newState = !prev;
            if (newState) setPanelOpen(true); // expand JSON by default when claims open
            return newState;
          });
        }}
        sx={{ cursor: 'pointer' }}
      >
        <IconButton size="small" className="text-brand-cyan mr-2">
          {claimsOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
        <DescriptionIcon sx={{ fontSize: 24, color: 'f7c59f', marginRight: 1 }} />
        <Typography
          variant="h6"
          className="font-semibold text-brand-mediumBlue hover:text-brand-primary-blue transition-colors duration-200"
        >
          Claims Data
        </Typography>
      </Box>

      {/* Collapsible Claims Section */}
      <Collapse in={claimsOpen} unmountOnExit>
        <Box mt={3}>
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
                  sx={{
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#1355E9',
                      transition: 'all 0.3s ease',
                    },
                  }}
                />
              ))}
            </Tabs>

            {/* Panel for Tab Content */}
            <Box
              className="mt-4 bg-white rounded-2xl shadow-lg overflow-hidden"
              onMouseEnter={() => setIsClaimsHovered(true)}
              onMouseLeave={() => setIsClaimsHovered(false)}
            >
              <Box className="p-4 flex items-center justify-between">
                <Box display="flex" alignItems="center">
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

                  {/*  Show message only if it exists and is not "User not found" */}
                  {(() => {
                    const currentTabKey = tabKeys[selectedTab];
                    const currentData = apiData[currentTabKey];
                    let message = '';

                    if (currentTabKey === 'mcid') {
                      message = currentData?.mcid_claims_data?.processStatus?.errorText || '';
                    }

                    return message ? (
                      <Typography variant="body1" className="text-gray-700">
                        {message}
                      </Typography>
                    ) : null;
                  })()}
                </Box>

                {/*  Copy JSON Icon on Hover */}
                {isClaimsHovered && (
                  <Tooltip title="Copy JSON">
                    <IconButton
                      size="small"
                      onClick={() => {
                        const currentTabKey = tabKeys[selectedTab];
                        const currentData = apiData[currentTabKey];
                        navigator.clipboard.writeText(JSON.stringify(currentData, null, 2));
                      }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              <Collapse in={panelOpen} unmountOnExit>
                <Box className="p-4 bg-gray-50 rounded-lg">
                  <Typography
                    variant="body2"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      color: '#374151',
                    }}
                  >
                    {JSON.stringify(apiData[tabKeys[selectedTab]], null, 2)}
                  </Typography>
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
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.medical.total_hlth_srvc_records ?? 0}</Typography>
                    <Typography variant="body2" className="text-gray-600">Health Service Records</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.medical.total_diagnosis_codes ?? 0}</Typography>
                    <Typography variant="body2" className="text-gray-600">Diagnosis Codes</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.medical.unique_service_codes?.length ?? 0}</Typography>
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
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.pharmacy.total_ndc_records ?? 0}</Typography>
                    <Typography variant="body2" className="text-gray-600">NDC Records</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.pharmacy.unique_ndc_codes?.length ?? 0}</Typography>
                    <Typography variant="body2" className="text-gray-600">Unique NDC Codes</Typography>
                  </Paper>
                  <Paper elevation={2} className="text-center" sx={{ p: 4, borderRadius: 2, minWidth: 350, minHeight: 160, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h4" className="font-bold text-brand-navy">{extractionSummary.pharmacy.unique_label_names?.length ?? 0}</Typography>
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
        <Box
          className="bg-white p-2 rounded-2xl shadow-lg"
          display="flex"
          alignItems="center"
          onClick={() => setEntityExtractionOpen(prev => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <IconButton size="small" className="text-brand-cyan mr-2">
            {entityExtractionOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
          <PrecisionManufacturingIcon sx={{ fontSize: 24, color: '#1E58AA', marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue hover:text-brand-primary-blue transition-colors duration-200">
            Enhanced Entity Extraction
          </Typography>
        </Box>

        <Collapse in={entityExtractionOpen} unmountOnExit>
          <Box
            mt={3}
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap" 
            gap={2}
          >
            {[
              { label: 'Diabetes', value: entities.diabetics || 'unknown', icon: <HealingIcon sx={{ color: '#d81b60', mr: 1 }} /> },
              { label: 'Age Group', value: entities.age_group || 'unknown', icon: <ElderlyIcon sx={{ color: '#6d4c41', mr: 1 }} /> },
              { label: 'Smoking', value: entities.smoking || 'unknown', icon: <SmokingRoomsIcon sx={{ color: '#607d8b', mr: 1 }} /> },
              { label: 'Alcohol', value: entities.alcohol || 'unknown', icon: <LiquorIcon sx={{ color: '#673ab7', mr: 1 }} /> },
              { label: 'Blood Pressure', value: entities.blood_pressure || 'unknown', icon: <MonitorHeartIcon sx={{ color: '#e53935', mr: 1 }} /> },
            ].map((item, index) => (
              <Paper
                key={index}
                elevation={2}
                className="p-4 rounded-lg text-center"
                sx={{
                  width: 210,
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Box display="flex" alignItems="center" justifyContent="center">
                  {item.icon}
                  <Typography variant="h6" className="font-bold text-brand-navy">
                    {item.label}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    color: '#374151',
                  }}
                >
                  {item.value.toUpperCase()}
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
          <TrendingUpIcon sx={{ fontSize: 24, color: '#9C27B0', marginRight: 1 }} />
          <Typography variant="h6" className="font-semibold text-brand-mediumBlue  hover:text-brand-primary-blue transition-colors duration-200">
            Health Trajectory
          </Typography>

        </Box>

        <Collapse in={healthTrajectoryOpen} unmountOnExit>
          <Box mt={3} className="bg-white p-6 rounded-xl shadow-md">
            <Typography
              variant="body2"
              className="text-gray-800"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {trajectory}
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
            Patient Health Summary
          </Typography>

        </Box>

        <Collapse in={finalSummaryOpen} unmountOnExit>
          <Box mt={3} className="bg-white p-6 rounded-xl shadow-md">
            <Typography
              variant="body2"
              className="text-gray-800"
              sx={{ whiteSpace: 'pre-line' }}
            >
              {finalSummary}
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
                {heartRisk || 'Risk data not available'}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      </Box>

    </Box>
  );
}
