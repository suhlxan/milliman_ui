// src/pages/MainPage.tsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  LinearProgress,
  Slide,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns }                   from '@mui/x-date-pickers/AdapterDateFns';
import { subYears }                         from 'date-fns';

import ResultsTab from '../components/ResultsTab';
import SSNField   from '../components/SSNField';
import EHLogo     from '../assets/images/EH_Logo.svg';

const GENDERS = ['Female', 'Male', 'Other'];
const sanitizeName = (v: string) => v.replace(/[^\p{L}'\-]/gu, '');

export default function MainPage() {
  // form state
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [gender,    setGender]    = useState('');
  const [ssn,       setSSN]       = useState('');
  const [showSSN,   setShowSSN]   = useState(false);
  const [dob,       setDob]       = useState<Date | null>(null);
  const [zipCode,   setZipCode]   = useState('');

  // loading & submitted
  const [isLoading, setIsLoading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const today    = new Date();
  const earliest = subYears(today, 150);

  useEffect(() => {
    document.title = 'Elevance Health | Milliman Dashboard';
  }, []);

  const startAnalysis = () => {
    setIsLoading(true);
    const step    = 100 / (5000 / 100);
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setSubmitted(true);
      setProgress(0);
    }, 5000);
  };

  const inputClasses =
    'h-14 w-full rounded-md outline-none ' +
    'focus:border-brand-mediumBlue focus:ring-2 focus:ring-brand-mediumBlue ' +
    'transition-all duration-150';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAV BAR */}
      <div className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <img src={EHLogo} alt="Elevance Logo" className="h-10 object-contain" />
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Personal Details — always visible */}
        <Typography component="h2" variant="h4" className="font-bold mb-6">
          Personal Details
        </Typography>
        <Typography variant="body1" className="text-gray-600 mb-6">
          Enter patient information below. This data will be processed through 
          the Health Agent workflow with AI analysis and will be avaliable for 
          interactive chat queries. 
        </Typography>
        <Box className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <TextField
              className={inputClasses}
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(sanitizeName(e.target.value))}
              variant="outlined"
            />
            <TextField
              className={inputClasses}
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(sanitizeName(e.target.value))}
              variant="outlined"
            />
            <TextField
              className={inputClasses}
              select
              label="Gender"
              value={gender}
              onChange={e => setGender(e.target.value)}
              variant="outlined"
            >
              {GENDERS.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
            <SSNField
              className={inputClasses}
              value={ssn}
              show={showSSN}
              onChange={setSSN}
              onToggleVisibility={() => setShowSSN(x => !x)}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={setDob}
                openTo="year"
                views={['year','month','day']}
                minDate={earliest}
                maxDate={today}
                slotProps={{ textField: { className: inputClasses, variant: 'outlined' } }}
              />
            </LocalizationProvider>
            <TextField
              className={inputClasses}
              label="Zip Code"
              placeholder="12345"
              value={zipCode}
              onChange={e => setZipCode(e.target.value.replace(/\D/g,'').slice(0,5))}
              inputProps={{ maxLength:5, inputMode:'numeric', pattern:'\\d*' }}
              variant="outlined"
            />
          </div>
        </Box>

        {/* Execute button or 5s loader */}
        {isLoading ? (
          <Box className="mt-12">
            <Box
              className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl overflow-hidden"
              sx={{ height: 36, mx: 'auto' }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 36,
                  borderRadius: 2,
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(180deg, #e01cd5 0%, #1CB5E0 100%)',
                  },
                  '& .MuiLinearProgress-colorPrimary': {
                    backgroundColor: 'transparent',
                  },
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box className="flex justify-center mt-12">
            <Button
              variant="contained"
              size="large"
              onClick={startAnalysis}
              className="bg-brand-primary-blue hover:bg-brand-mediumBlue active: bg-brand-black rounded-full px-12 py-3"
            >
              Execute Health Agent Analysis
            </Button>
          </Box>
        )}

        {/* ResultsTab slides in after loading completes */}
        <Slide
          in={submitted}
          direction="up"
          mountOnEnter
          unmountOnExit
          easing={{ enter: 'cubic-bezier(0.7, 0, 0.3, 1)' }}
          timeout={500}
        >
          <div className="mt-12">
            <Typography variant="h5" className="font-semibold text-brand-navy mb-4">
              Health Agent Analysis Results
            </Typography>
            <ResultsTab />
          </div>
        </Slide>
      </div>
    </div>
  );
}