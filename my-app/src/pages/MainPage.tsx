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
import { useHealthAgentAnalysis } from '../hooks/useHealthAgentAnalysis';
import { sanitizeName } from '../utils/sanitize';
import { calculateAge } from '../utils/ageUtils';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import AssessmentIcon from '@mui/icons-material/Assessment';


export default function MainPage() {
  // form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [ssn, setSSN] = useState('');
  const [showSSN, setShowSSN] = useState(false);
  const [dob, setDob] = useState<Date | null>(null);
  const [zipCode, setZipCode] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});


  // analysis logic
  const {
    isLoading,
    progress,
    submitted,
    startAnalysis,
  } = useHealthAgentAnalysis();

  useEffect(() => {
    document.title = 'Elevance Health | Milliman Dashboard';
  }, []);

  const handleExecute = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!gender) newErrors.gender = "Gender is required.";
    if (!dob) newErrors.dob = "Date of birth is required.";
    if (!zipCode || zipCode.length < 5) newErrors.zipCode = "Enter a valid 5-digit ZIP code.";
    if (!ssn || ssn.replace(/\D/g, '').length < 9) newErrors.ssn = "Enter a 9-digit SSN.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    startAnalysis();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAV BAR */}
      <NavBar logoSrc={EHLogo} />

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* <Typography component="h2" variant="h4" className="font-bold mb-6 text-center pb-4">
          Personal Details
        </Typography> */}
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
          setFirstName={(val) => setFirstName(sanitizeName(val))}
          lastName={lastName}
          setLastName={(val) => setLastName(sanitizeName(val))}
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

        {/* Calculated Age Box */}
        {dob && (
          <Box
            display="flex"
            alignItems="center"
            bgcolor="rgb(232, 240, 254)"
            borderRadius={2}
            paddingY={2}
            paddingX={3}
            marginTop={4}
            sx={{ width: 'fit-content' }}
          >
            <CalendarMonthIcon color="primary" sx={{ marginRight: 1 }} />
            <Typography variant="body1">
              <strong>Calculated Age:</strong> {calculateAge(dob.toISOString().split("T")[0])} old
            </Typography>
          </Box>
        )}

        {/* Execute Button or Loading Bar */}
        {/* {!isLoading && !submitted ? (
          <Box className="flex justify-center mt-12">
            <Button
              variant="contained"
              size="large"
              onClick={handleExecute}
              className="bg-brand-primary-blue hover:bg-brand-mediumBlue active:bg-black rounded-full px-12 py-3"
            >
              Execute Health Agent Analysis
            </Button>
          </Box>
        ) : isLoading ? (
          <LoadingBar progress={progress} />
        ) : null}
         */}

        {!isLoading && !submitted ? (
          <Box className="flex justify-center mt-12">
            <Button
              variant="contained"
              size="large"
              onClick={handleExecute}
              className="bg-brand-primary-blue hover:bg-brand-mediumBlue active:bg-black rounded-full px-12 py-3"
            >
              Execute Health Agent Analysis
            </Button>
          </Box>
        ) : isLoading && !submitted ? (
          <>
            {/* Summary Cards */}
            <Box mt={6} display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
              {[
                { label: 'TOTAL STEPS', value: 8 },
                { label: 'COMPLETED', value: 3 },
                { label: 'PROCESSING', value: 1 },
                { label: 'PROGRESS', value: `${progress}%` },
              ].map((item, index) => (
                <Box
                  key={index}
                  component={Paper}
                  elevation={3}
                  sx={{
                    padding: 2,
                    width: 150,
                    textAlign: 'center',
                    bgcolor: '#e3f2fd',
                  }}
                >
                  <Typography variant="h6" color="primary">
                    {item.value}
                  </Typography>
                  <Typography variant="body2">{item.label}</Typography>
                </Box>
              ))}
            </Box>

            {/* Loader */}
            <Box mt={4}>
              <LoadingBar progress={progress} />
            </Box>
          </>
        ) : null}

        {submitted && (
          <div className="mt-12">
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <AssessmentIcon fontSize="large" sx={{ color: '#1a237e', marginRight: 1 }} />
              <Typography variant="h4" className="font-semibold text-brand-navy">
                Health Agent Analysis Results
              </Typography>
            </Box>
            <ResultsTab />
          </div>
        )}

      </div>
    </div>
  );
}
 