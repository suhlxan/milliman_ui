// src/pages/MainPage.tsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns }                   from '@mui/x-date-pickers/AdapterDateFns';
import { subYears }                         from 'date-fns';

import ResultsTab from '../components/ResultsTab';
import SSNField   from '../components/SSNField';
import EHLogo     from '../assets/images/EH_Logo.svg';

const GENDERS = ['Female', 'Male', 'Other'];

// Regex to allow letters (including accents), hyphens and apostrophes
const nameSanitizer = (value: string) =>
  value.replace(/[^\p{L}'\-]/gu, '');

export default function MainPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [gender,    setGender]    = useState('');
  const [ssn,       setSSN]       = useState('');
  const [showSSN,   setShowSSN]   = useState(false);
  const [dob,       setDob]       = useState<Date | null>(null);
  const [zipCode,   setZipCode]   = useState('');
  const [submitted, setSubmitted] = useState(false);

  // calculate today and 150 years ago
  const today = new Date();
  const earliest = subYears(today, 150);

  useEffect(() => {
    document.title = 'Elevance Health | Milliman Dashboard';
  }, []);

  const handleSubmit = () => {
    console.log({ firstName, lastName, gender, ssn, dob, zipCode });
    alert('Health Agent Analysis executed!');
    setSubmitted(true);
  };

  // uniform height + full width for all inputs
  const inputClasses =
    'h-14 w-full rounded-md outline-none ' +
    'focus:border-brand-mediumBlue focus:ring-2 focus:ring-brand-mediumBlue ' +
    'transition-all duration-150';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAV BAR */}
      <div className="bg-brand-navy">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center">
          <img
            src={EHLogo}
            alt="Elevance Health Logo"
            className="h-10 object-contain"
          />
        </div>
      </div>

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

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
            {/* First Name */}
            <TextField
              className={inputClasses}
              label="First Name"
              value={firstName}
              onChange={e => setFirstName(nameSanitizer(e.target.value))}
              variant="outlined"
            />

            {/* Last Name */}
            <TextField
              className={inputClasses}
              label="Last Name"
              value={lastName}
              onChange={e => setLastName(nameSanitizer(e.target.value))}
              variant="outlined"
            />

            {/* Gender */}
            <TextField
              className={inputClasses}
              select
              label="Gender"
              value={gender}
              onChange={e => setGender(e.target.value as string)}
              variant="outlined"
            >
              {GENDERS.map(g => (
                <MenuItem key={g} value={g}>
                  {g}
                </MenuItem>
              ))}
            </TextField>

            {/* SSN */}
            <SSNField
              className={inputClasses}
              value={ssn}
              show={showSSN}
              onChange={setSSN}
              onToggleVisibility={() => setShowSSN(x => !x)}
            />

            {/* Date of Birth */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={dob}
                onChange={newVal => setDob(newVal)}
                openTo="year"
                views={['year', 'month', 'day']}
                minDate={earliest}
                maxDate={today}
                slotProps={{
                  textField: {
                    className: inputClasses,
                    variant: 'outlined',
                  },
                }}
              />
            </LocalizationProvider>

            {/* Zip Code */}
            <TextField
              className={inputClasses}
              label="Zip Code"
              placeholder="12345"
              value={zipCode}
              onChange={e => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              inputProps={{ maxLength: 5, inputMode: 'numeric', pattern: '\\d*' }}
              variant="outlined"
            />
          </div>
        </div>

        {/* EXECUTE BUTTON */}
        <div className="flex justify-center mt-8">
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            className="bg-brand-primary-blue hover:bg-brand-mediumBlue rounded-full px-12 py-3"
          >
            Execute Health Agent Analysis
          </Button>
        </div>

        {/* RESULTS TABS */}
        {submitted && (
          <div className="mt-12">
            <Typography variant="h5" className="font-semibold text-brand-navy mb-4">
              Health Agent Analysis Results
            </Typography>
            <ResultsTab />
          </div>
        )}
      </div>
    </div>
  );
}