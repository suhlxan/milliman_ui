import React, { useState, useEffect } from 'react';
import {
  Button,
  Typography,
  Box,
} from '@mui/material';

import NavBar from '../components/NavBar';
import EHLogo from '../assets/images/EH_Logo.svg';
import PersonalDetailsForm from '../components/PersonalDetailsForm';
import LoadingBar from '../components/LoadingBar';
import ResultsTab from '../components/ResultsTab';
import { useHealthAgentAnalysis } from '../hooks/useHealthAgentAnalysis';
import { sanitizeName } from '../utils/sanitize';
import { calculateAge } from '../utils/ageUtils';

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
        <Typography component="h2" variant="h4" className="font-bold mb-6">
          Personal Details
        </Typography>
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

        {/* Age Display */}
        {dob && (
          <Typography className="text-h3 mb-1.5 text-gray-600">
            Calculated Age: {calculateAge(dob.toISOString().split("T")[0])}
          </Typography>
        )}

        {/* Execute Button or Loading Bar */}
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
        ) : isLoading ? (
          <LoadingBar progress={progress} />
        ) : null}

        {/* Results show after loading completes */}
        {submitted && (
          <div className="mt-12">
            <Typography variant="h3" className="font-semibold text-brand-navy mb-4">
              Health Agent Analysis Results
            </Typography>
            <ResultsTab />
          </div>
        )}
      </div>
    </div>
  );
}
