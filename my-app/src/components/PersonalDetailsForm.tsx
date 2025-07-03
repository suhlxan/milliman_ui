import React from "react";
import {
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subYears } from "date-fns";

import SSNField from "./SSNField";

interface Props {
  firstName: string;
  lastName: string;
  gender: string;
  ssn: string;
  showSSN: boolean;
  dob: Date | null;
  zipCode: string;

  setFirstName: (v: string) => void;
  setLastName: (v: string) => void;
  setGender: (v: string) => void;
  setSSN: (v: string) => void;
  setShowSSN: (v: boolean) => void;
  setDob: (d: Date | null) => void;
  setZipCode: (v: string) => void;
}

const GENDERS = ["Female", "Male", "Other"];
const inputClasses =
  "h-14 w-full rounded-md outline-none " +
  "focus:border-brand-mediumBlue focus:ring-2 focus:ring-brand-mediumBlue " +
  "transition-all duration-150";

const PersonalDetailsForm: React.FC<Props> = ({
  firstName,
  lastName,
  gender,
  ssn,
  showSSN,
  dob,
  zipCode,
  setFirstName,
  setLastName,
  setGender,
  setSSN,
  setShowSSN,
  setDob,
  setZipCode,
}) => {
  const today = new Date();
  const earliest = subYears(today, 150);

  return (
    <Box className="bg-white rounded-2xl shadow-lg p-8 mt-8 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
        <TextField
          className={inputClasses}
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          variant="outlined"
        />
        <TextField
          className={inputClasses}
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          variant="outlined"
        />
        <TextField
          className={inputClasses}
          select
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          variant="outlined"
        >
          {GENDERS.map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </TextField>
        <SSNField
          className={inputClasses}
          value={ssn}
          show={showSSN}
          onChange={setSSN}
          onToggleVisibility={() => setShowSSN(!showSSN)}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={setDob}
            openTo="year"
            views={["year", "month", "day"]}
            minDate={earliest}
            maxDate={today}
            slotProps={{
              textField: { className: inputClasses, variant: "outlined" },
            }}
          />
        </LocalizationProvider>
        <TextField
          className={inputClasses}
          label="Zip Code"
          placeholder="12345"
          value={zipCode}
          onChange={(e) =>
            setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
          }
          inputProps={{ maxLength: 5, inputMode: "numeric", pattern: "\\d*" }}
          variant="outlined"
        />
      </div>
    </Box>
  );
};

export default PersonalDetailsForm;
