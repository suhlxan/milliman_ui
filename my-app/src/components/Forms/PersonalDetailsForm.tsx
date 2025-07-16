
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
import FormError from "./FormError";
import { inputFieldClass, formContainerClass, formGridClass } from './styles';

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

  errors: Record<string, string>;
}

const GENDERS = ["Female", "Male", "Other"];

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
  errors,
}) => {
  const today = new Date();
  const earliest = subYears(today, 150);

  return (
    <Box className={formContainerClass}>
      <div className={formGridClass}>
        <div>
          <TextField
            className={inputFieldClass}
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            variant="outlined"
            error={!!errors.firstName}
          />
          {errors.firstName && <FormError message={errors.firstName} />}
        </div>

        <div>
          <TextField
            className={inputFieldClass}
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            variant="outlined"
            error={!!errors.lastName}
          />
          {errors.lastName && <FormError message={errors.lastName} />}
        </div>

        <div>
          <TextField
            className={inputFieldClass}
            select
            label="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            variant="outlined"
            error={!!errors.gender}
          >
            {GENDERS.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
          {errors.gender && <FormError message={errors.gender} />}
        </div>

        <div>
          <SSNField
            className={inputFieldClass}
            value={ssn}
            show={showSSN}
            onChange={setSSN}
            onToggleVisibility={() => setShowSSN(!showSSN)}
            error={!!errors.ssn}
          />
          {errors.ssn && <FormError message={errors.ssn} />}
        </div>

        <div>
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
                textField: {
                  className: inputFieldClass,
                  variant: "outlined",
                  error: !!errors.dob,
                },
              }}
            />
          </LocalizationProvider>
          {errors.dob && <FormError message={errors.dob} />}
        </div>

        <div>
          <TextField
            className={inputFieldClass}
            label="Zip Code"
            placeholder="12345"
            value={zipCode}
            onChange={(e) =>
              setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
            }
            inputProps={{ maxLength: 5, inputMode: "numeric", pattern: "\\d*" }}
            variant="outlined"
            error={!!errors.zipCode}
          />
          {errors.zipCode && <FormError message={errors.zipCode} />}
        </div>
      </div>
    </Box>
  );
};

export default PersonalDetailsForm;
