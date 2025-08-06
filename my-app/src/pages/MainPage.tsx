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
import axios from 'axios';
import AgentService from '../api/AgentService';
import { stepDescriptions } from '../components/Workflow/WorkflowStatusList';

export default function MainPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSSN] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isExecuting, setIsExecuting] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [stepStatus, setStepStatus] = useState<Record<string, string>>({});
  const [sessionId, setSessionId] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showStopButton, setShowStopButton] = useState(false);// UI control state

  const {
    isLoading,
    progress,
    submitted,
    errors,
    setSubmitted,
    execute: handleExecute,
  } = useAnalysisRunner({
    formData: { firstName, lastName, gender, dob, zipCode, ssn },
    onStatusUpdate: setStepStatus,
    onComplete: (syncResult) => {
      setAnalysisResults(syncResult.analysis_results);
      setSessionId(syncResult.session_id);
      setIsExecuting(false); 
    },
  });

  useEffect(() => {
    document.title = 'Elevance Health | Milliman Dashboard';
  }, []);

  useEffect(() => {
    if (!isLoading || submitted) {
      setShowStopButton(false);
    }
  }, [isLoading, submitted]);

  const handleStart = async () => {
    if (isExecuting) return;
    setIsExecuting(true);
    setShowStopButton(true);

    handleExecute();
    simulateStepProgress();

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        ssn,
        date_of_birth: dob?.toISOString().split('T')[0] ?? '',
        gender: gender.charAt(0),
        zip_code: zipCode,
      };

      const syncResult = await AgentService.runAnalysisSync(payload);

      if (syncResult.success) {
        console.log('Sync Analysis Result:', syncResult);

        if (syncResult.session_id) {
          setSessionId(syncResult.session_id);
        }
        setAnalysisResults(syncResult.analysis_results);
        setSubmitted(true);
      } else {
        console.warn('Validation Errors (sync):', syncResult.errors);
        alert('Synchronous analysis failed. Please check form input.');
        setShowStopButton(false);
      }
    } catch (error) {
      console.error('Execute Health Agent failed:', error);
      alert('Unexpected error during execution.');
      setShowStopButton(false);
    } finally {
      setIsExecuting(false);
    }
  };

  const stepKeys = Object.keys(stepDescriptions);

  const simulateStepProgress = async () => {
    for (let i = 0; i < stepKeys.length; i++) {
      setCurrentStepIndex(i); 
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
  };

  const handleStop = () => {
    setShowStopButton(false);
    window.location.reload(); 
  };

  const totalSteps = stepKeys.length;
  const completedSteps = Object.values(stepStatus).filter(
    (status) => status.toLowerCase() === 'completed'
  ).length;

  return (
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
  
      {/*  Printable Content Wrapper */}
      <div id="printable-content">
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
                sessionId={sessionId}
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
                    {(() => {
                      const totalSteps = stepKeys.length;
                      const completedSteps = currentStepIndex;
                      const processingSteps = currentStepIndex < totalSteps ? 1 : 0;
                      const progress = Math.floor((completedSteps / totalSteps) * 100);
  
                      return [
                        { label: 'TOTAL STEPS', value: totalSteps },
                        { label: 'COMPLETED', value: completedSteps },
                        { label: 'PROCESSING', value: processingSteps },
                        { label: 'PROGRESS', value: `${progress}%` },
                      ].map((item, index) => (
                        <Paper key={index} elevation={3} className="shine-hover" sx={styles.statPaper}>
                          <Typography variant="h4" sx={styles.statValue}>
                            {item.value}
                          </Typography>
                          <Typography variant="body2" sx={styles.statLabel}>
                            {item.label}
                          </Typography>
                        </Paper>
                      ));
                    })()}
                  </Box>
  
                  <Box mt={4}>
                    <LoadingBar progress={(currentStepIndex / stepKeys.length) * 100} />
                  </Box>
  
                  <WorkflowStatusList currentStepIndex={currentStepIndex} />
                </>
              ) : null}
  
              {submitted && analysisResults && (
                <div className="mt-12">
                  <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                    <AssessmentIcon fontSize="large" sx={styles.resultsSectionIcon} />
                    <Typography variant="h4" className={styles.resultsTitleClass}>
                      Health Agent Analysis Results
                    </Typography>
                  </Box>
                  <ResultsTab analysisResults={analysisResults} />
                </div>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </div>
  );
}
