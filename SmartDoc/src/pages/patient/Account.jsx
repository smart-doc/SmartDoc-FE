import React, { useState } from 'react';
import CreateAccount from './CreateAccount';
import VerifyEmailPatient from './VerifyEmailPatient';
import PersonalInfo from './PersonalInfo';
import ContactForm from './ContactFrom';
import EmergencyForm from './EmergencyForm';
import SuccessfulPage from './SuccessfulPage';
import HealthProfile from './HealthProfile';

const STAGES = {
  START: 'start',
  EMAILVERIFICATION: 'verifyEmailPatient',
  PERSONALINFO: 'personalInfo',
  CONTACTINFO: 'contactInfo',
  EMERGENCY: 'emergency',
  HEALTH: 'healthProfile',
  SUCCESS: 'success',
};

const Account = () => {
  const [stage, setStage] = useState(STAGES.START);
  
  const [formData, setFormData] = useState({
    account: {},
    emailVerification: {},
    personalInfo: {},
    contactInfo: {},
    emergency: {},
    healthProfile: {},
  });

  const [backendData, setBackendData] = useState(null);

  const updateFormData = (key, data) => {
    setFormData(prev => ({
      ...prev,
      [key]: { ...prev[key], ...data }
    }));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {stage === STAGES.START && (
        <CreateAccount
          initialData={formData.account}
          onNext={(data) => {
            updateFormData('account', data);
            setStage(STAGES.EMAILVERIFICATION);
          }}
        />
      )}

      {stage === STAGES.EMAILVERIFICATION && (
        <VerifyEmailPatient
          initialData={formData.emailVerification}
          onNext={(data) => {
            updateFormData('verifyEmailPatient', data);
            setStage(STAGES.PERSONALINFO);
          }}
        />
      )}

      {stage === STAGES.PERSONALINFO && (
        <PersonalInfo
          initialData={formData.personalInfo}
          onNext={(data) => {
            updateFormData('personalInfo', data);
            setStage(STAGES.CONTACTINFO);
          }}
        />
      )}

      {stage === STAGES.CONTACTINFO && (
        <ContactForm
          initialData={formData.contactInfo}
          onNext={(data) => {
            updateFormData('contactInfo', data);
            setStage(STAGES.EMERGENCY);
          }}
        />
      )}

      {stage === STAGES.EMERGENCY && (
        <EmergencyForm
          initialData={formData.emergency}
          onNext={(data) => {
            updateFormData('emergency', data);
            setStage(STAGES.HEALTH);
          }}
        />
      )}

      {stage === STAGES.HEALTH && (
        <HealthProfile
          formData={formData}
          onNext={(backendResponse) => {
            setBackendData(backendResponse); // save backend data
            setStage(STAGES.SUCCESS);
          }}
        />
      )}

      {stage === STAGES.SUCCESS && <SuccessfulPage firstName={backendData?.firstName} />}
    </div>
  );
};

export default Account;

