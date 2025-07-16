import React, { useState, useEffect, forwardRef } from 'react';
import {
  Button,
  Typography,
  Box,
  Paper
} from '@mui/material';

import NavBar from '../components/navbar/NavBar';
import EHLogo from '../assets/images/EH_Logo.svg';
import PersonalDetailsForm from '../components/Forms/PersonalDetailsForm';
import ResultsTab from '../components/ResultsTab';
import { AdvancedWorkflowContainer, LoadingBar, WorkflowStatusList } from '../components/Workflow';

import { sanitizeName } from '../utils/sanitize';
import { capitalizeFirstLetter } from '../utils/format';
import { calculateAge } from '../utils/ageUtils';
import { useAnalysisRunner } from '../hooks/useAnalysisRunner';


import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';
import IconButton from '@mui/material/IconButton';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DraggableChatbotPanel from '../components/DraggableChatbotPanel';
import * as styles from './styles';

export default function MainPage() {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSSN] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(300);

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
    // <div
    //   className="min-h-screen bg-gray-100">
    <div
      className="min-h-screen bg-gray-100"
      style={styles.getContainerMargin(submitted, isChatVisible, sidebarWidth)}
    >
      {/* NAV BAR */}
      <NavBar
        logoSrc={EHLogo}
        onRerun={handleStart}
        showStopButton={showStopButton}
        onStop={handleStop}
      />

      {/* PAGE CONTENT */}
      <div className={styles.contentContainerClass}>
        <Box
          display="flex"
          flexDirection={submitted ? { xs: 'column', md: 'row' } : 'column'}
          gap={2}
          alignItems="stretch"
          width="100%"
        >
          {/* Chatbot Panel (only when submitted) */}
          {submitted && isChatVisible && (
            <DraggableChatbotPanel
              visible={submitted && isChatVisible}
              onClose={() => setIsChatVisible(false)}
              onWidthChange={(w) => setSidebarWidth(w)}
            />
          )}

          {submitted && !isChatVisible && (
            <IconButton
              onClick={() => setIsChatVisible(true)}
              sx={styles.chatbotToggleButton}
            >
              <SmartToyIcon />
            </IconButton>
          )}

          {/* Patient Details and Analysis */}
          {/* <Box flex={2}> */}
          <Box flex={submitted && isChatVisible ? 2 : 1}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <PersonIcon sx={styles.sectionTitleIcon} />
              <Typography component="h2" variant="h4" className={styles.sectionTitleTextClass}>
                Patient Information
              </Typography>
            </Box>

            <Typography variant="body1" className={styles.descriptionTextClass}>
              Enter patient information below. This data will be processed through
              the Health Agent workflow with AI analysis and will be available for
              interactive chat queries.
            </Typography>

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

            {dob && !isNaN(dob.getTime()) && calculateAge(dob.toISOString().split("T")[0]) && (
              <Box
                display="flex"
                alignItems="center"
                className="bg-brand-pale-cyan"
                borderRadius={2}
                paddingY={2}
                paddingX={3}
                marginTop={4}
                sx={styles.cardAgeBox}
              >
                <CalendarMonthIcon color="primary" sx={styles.calendarIcon} />
                <Typography variant="body1">
                  <strong>Calculated Age:</strong> {calculateAge(dob.toISOString().split("T")[0])} old
                </Typography>
              </Box>
            )}

            {!isLoading && !submitted ? (
              <Box className="flex justify-center mt-12">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleStart}
                  // className="bg-brand-primary-blue hover:bg-brand-mediumBlue active:bg-black rounded-full px-12 py-3"
                  startIcon={<PlayArrowIcon />} 
                  className={styles.executeButtonClass}
                >
                  Execute Health Agent
                </Button>
              </Box>
            ) : isLoading && !submitted ? (
              <>
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
                      sx={styles.statPaper}
                    >
                      <Typography variant="h4" sx={styles.statValue}>
                        {item.value}
                      </Typography>
                      <Typography variant="body2" sx={styles.statLabel}>
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

            {submitted && (
              <div className="mt-12">
                <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                  <AssessmentIcon fontSize="large" sx={styles.resultsSectionIcon} />
                  <Typography variant="h4" className={styles.resultsTitleClass}>
                    Health Agent   Analysis Results
                  </Typography>
                </Box>
                <ResultsTab />
              </div>
            )}
          </Box>
        </Box>
      </div>

    </div>
  );
}
