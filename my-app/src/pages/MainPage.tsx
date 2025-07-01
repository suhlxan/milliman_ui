import React, { useState, useEffect } from "react";
import EHLogo from "../assets/images/EH_Logo.svg";
import TitleBlock from "../components/TitleBlock";
import SSNField from "../components/SSNField";
import GenderDropdown from "../components/GenderDropdown";
import TextInput from "../components/TextInput";
import DateInput from "../components/DateInput";
import ZipCodeInput from "../components/ZipCodeInput";
import SubmitButton from "../components/SubmitButton";
import { isValidDOB } from "../utils/ageUtils";

const MainPage: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [ssn, setSSN] = useState("");
  const [dob, setDob] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [showSSN, setShowSSN] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Elevance Health | Milliman Dashboard";
  }, []);

  const handleSubmit = () => {
    console.log({ firstName, lastName, gender, ssn, dob, zipCode });
    alert("Health Agent Analysis executed!");
    setSubmitted(true);
  };

  const inputClasses =
    "border border-brand-gray p-3 rounded-md outline-none focus:border-brand-mediumBlue focus:ring-2 focus:ring-brand-mediumBlue transition-all duration-150 w-full";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-brand-navy h-[120px] flex items-center">
        <div className="w-full max-w-content mx-auto px-gutter">
          <img
            src={EHLogo}
            alt="Elevance Health Logo"
            width={139}
            height={61}
            className="object-contain"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex justify-center mt-12">
        <div className="w-full max-w-content px-gutter">
          <TitleBlock
            title="Health Agent"
            subtitle="Enter patient information below. This data will be processed through the Health Agent workflow with AI analysis and will be available for interactive chat queries."
          />

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12 mb-8">
            <div className="w-full">
              <TextInput
                placeholder="First Name"
                value={firstName}
                onChange={setFirstName}
                inputClasses={inputClasses}
              />
            </div>
            <div className="w-full">
              <TextInput
                placeholder="Last Name"
                value={lastName}
                onChange={setLastName}
                inputClasses={inputClasses}
              />
            </div>
            <div className="w-full">
              <GenderDropdown
                value={gender}
                onChange={setGender}
                inputClasses={inputClasses}
              />
            </div>
            <div className="w-full">
              <SSNField
                value={ssn}
                show={showSSN}
                onChange={setSSN}
                onToggleVisibility={() => setShowSSN(!showSSN)}
                inputClasses={inputClasses}
              />
            </div>
            <div className="w-full">
              <DateInput
                value={dob}
                onChange={setDob}
                inputClasses={inputClasses}
              />
            </div>
            <div className="w-full">
              <ZipCodeInput
                value={zipCode}
                onChange={setZipCode}
                inputClasses={inputClasses}
              />
            </div>
          </div>

          <SubmitButton onClick={handleSubmit} />

          {/* Results Section */}
          {submitted && (
            <div className="mt-16">
              <hr className="border-t-2 border-brand-cyan mb-6" />
              <h3 className="text-h3 text-brand-navy font-semibold mb-4">
                Health Agent Analysis Results
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;