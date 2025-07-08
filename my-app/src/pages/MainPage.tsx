import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material';

import NavBar from '../components/NavBar';
import EHLogo from '../assets/images/EH_Logo.svg';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import LoadingBar from '../components/LoadingBar';
import ResultsTab from '../components/ResultsTab';
import ChatbotPanel from '../components/ChatbotPanel';

import { sanitizeName } from '../utils/sanitize';
import { capitalizeFirstLetter } from '../utils/format';
import { calculateAge } from '../utils/ageUtils';
import { useAnalysisRunner } from '../hooks/useAnalysisRunner';
import { useGsapTextAnimations } from '../hooks/useGsapTextAnimations';
import AdvancedWorkflowContainer from '../components/AdvancedWorkflowContainer';


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkflowStatusList from '../components/WorkflowStatusList';


export default function MainPage() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSSN] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');

  // UI control state
  const [showStopButton, setShowStopButton] = useState(false);

  // useAnalysisRunner hook handles full analysis lifecycle
  const {
    isLoading,
    progress,
    submitted,
    errors,
    execute: handleExecute,
  } = useAnalysisRunner({
    formData: { firstName, lastName, gender, dob, zipCode, ssn },
  });

  useEffect(() => {
    document.title = 'Elevance Health | Milliman Dashboard';
  }, []);

  useEffect(() => {
    if (!isLoading || submitted) {
      setShowStopButton(false);
    }
  }, [isLoading, submitted]);

  const handleStart = () => {
    setShowStopButton(true);
    handleExecute();
  };

  const handleStop = () => {
    setShowStopButton(false);
    window.location.reload(); // Hard reset, replace with cancellation logic if needed
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAV BAR */}
      <NavBar
        logoSrc={EHLogo}
        onRerun={handleStart}
        showStopButton={showStopButton}
        onStop={handleStop}
      />

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <PersonIcon sx={{ color: '#1a237e', marginRight: 1 }} />
          <Typography component="h2" variant="h4" className="font-bold">
            Personal Details
          </Typography>
        </Box>

        <Typography variant="body1" className="text-gray-600 mb-6">
          Enter patient information below. This data will be processed through
          the Health Agent workflow with AI analysis and will be available for
          interactive chat queries.
        </Typography>

        {/* Personal Details Form */}
        <PersonalDetailsForm
          firstName={firstName}
          setFirstName={(val) => setFirstName(capitalizeFirstLetter(sanitizeName(val)))}
          lastName={lastName}
          setLastName={(val) => setLastName(capitalizeFirstLetter(sanitizeName(val)))}
          gender={gender}
          setGender={setGender}
          ssn={ssn}
          setSSN={setSSN}
          showSSN={showSSN}
          setShowSSN={setShowSSN}
          dob={dob}
          setDob={setDob}
          zipCode={zipCode}
          setZipCode={setZipCode}
          errors={errors}
        />

        {/* Calculated Age */}
        {dob && !isNaN(dob.getTime()) && calculateAge(dob.toISOString().split("T")[0]) && (
          <Box
            display="flex"
            alignItems="center"
            className="bg-brand-pale-cyan"
            borderRadius={2}
            paddingY={2}
            paddingX={3}
            marginTop={4}
            sx={{
              width: 'fit-content',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // subtle elevation
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)',
              },
              cursor: 'default',
            }}
          >
            <CalendarMonthIcon color="primary" sx={{ marginRight: 1 }} />
            <Typography variant="body1">
              <strong>Calculated Age:</strong> {calculateAge(dob.toISOString().split("T")[0])} old
            </Typography>
          </Box>
        )}

        {/* Execute Button or Loading/Progress */}
        {!isLoading && !submitted ? (
          <Box className="flex justify-center mt-12">
            <Button
              variant="contained"
              size="large"
              onClick={handleStart}
              className="bg-brand-primary-blue hover:bg-brand-mediumBlue active:bg-black rounded-full px-12 py-3"
            >
              Execute Health Agent Analysis
            </Button>
          </Box>
        ) : isLoading && !submitted ? (
          <>
            {/* Visual Container Above the Cards */}
            <AdvancedWorkflowContainer />

            <Box
              mt={6}
              display="grid"
              gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
              gap={3}
            >
              {[
                { label: 'TOTAL STEPS', value: 8 },
                { label: 'COMPLETED', value: 3 },
                { label: 'PROCESSING', value: 1 },
                { label: 'PROGRESS', value: `${progress}%` },
              ].map((item, index) => (
                <Paper
                  key={index}
                  elevation={3}
                  className="shine-hover"
                  sx={{
                    p: 4,
                    borderRadius: '15px',
                    textAlign: 'center',
                    bgcolor: '#ecf8fe',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    '&:hover': {
                      transform: 'scale(1.15)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h4" sx={{ color: '#44B8F3', fontWeight: 'bold' }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#1E58AA', fontWeight: 'semi-bold' }}>
                    {item.label}
                  </Typography>
                </Paper>
              ))}
            </Box>


            <Box mt={4}>
              <LoadingBar progress={progress} />
            </Box>

            <WorkflowStatusList />

          </>
        ) : null}

        {/* Results */}
        {submitted && (
          <div className="mt-12">
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <AssessmentIcon fontSize="large" sx={{ color: '#20c997', marginRight: 1 }} />
              <Typography variant="h4" className="font-semibold text-brand-black">
                Health Agent Analysis Results
              </Typography>
            </Box>
            <ResultsTab />
          </div>
        )}
      </div>

      {/* Medical Assistant */}
      <ChatbotPanel visible={submitted} />

    </div>
  );
}
 