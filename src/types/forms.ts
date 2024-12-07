// Add new form types
export interface I751FormData {
  // Personal Information
  fullName: string;
  alienNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  currentAddress: string;
  phone: string;
  email: string;

  // Marriage Information
  spouseName: string;
  spouseDateOfBirth: string;
  marriageDate: string;
  marriagePlace: string;
  previousMarriages: boolean;
  previousMarriageDetails: string;

  // Joint Filing Evidence
  jointBankAccounts: boolean;
  jointLeases: boolean;
  jointUtilities: boolean;
  jointInsurance: boolean;
  jointTaxReturns: boolean;
  otherEvidence: string;

  // Children Information
  hasChildren: boolean;
  childrenDetails: string;

  // Additional Information
  criminalHistory: string;
  immigrationViolations: string;
  additionalInformation: string;
}

export interface FOIAFormData {
  // Requester Information
  requesterName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  alienNumber: string;
  mailingAddress: string;
  phone: string;
  email: string;
  
  // Request Details
  recordType: string;
  timeframeCovered: string;
  specificInformation: string;
  purposeOfRequest: string;
  
  // Verification
  proofOfIdentity: string;
  consentToRelease: boolean;
  
  // Additional Information
  additionalComments: string;
}

export interface I765FormData {
  // Personal Information
  fullName: string;
  otherNames: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  maritalStatus: string;
  ssn: string;
  alienNumber: string;
  
  // Contact Information
  mailingAddress: string;
  physicalAddress: string;
  phone: string;
  email: string;
  
  // Eligibility
  eligibilityCategory: string;
  previousEAD: boolean;
  previousEADDetails: string;
  
  // Education and Employment
  education: string;
  currentEmployer: string;
  
  // Additional Information
  criminalHistory: string;
  immigrationViolations: string;
  additionalInformation: string;
}

export interface I129FFormData {
  // Petitioner Information
  petitionerName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  citizenship: string;
  ssn: string;
  address: string;
  phone: string;
  email: string;
  maritalStatus: string;
  previousMarriages: boolean;
  previousMarriageDetails: string;
  
  // Beneficiary Information
  beneficiaryName: string;
  beneficiaryDateOfBirth: string;
  beneficiaryPlaceOfBirth: string;
  beneficiaryCitizenship: string;
  beneficiaryAddress: string;
  beneficiaryPhone: string;
  beneficiaryEmail: string;
  beneficiaryMaritalStatus: string;
  beneficiaryPreviousMarriages: boolean;
  beneficiaryPreviousMarriageDetails: string;
  
  // Relationship Information
  howMet: string;
  meetingDate: string;
  inPersonMeeting: boolean;
  meetingDetails: string;
  proposalDate: string;
  proposalDetails: string;
  
  // Additional Information
  criminalHistory: string;
  immigrationViolations: string;
  additionalInformation: string;
}

// Export existing types
export interface WorkHistoryEntry {
  employer: string;
  position: string;
  startDate: string;
  endDate: string;
  address: string;
  duties: string;
  isCurrent: boolean;
}

export interface ParentInfo {
  name: string;
  birthDate: string;
  birthPlace: string;
  currentAddress: string;
}

export interface FormData {
  // ... existing FormData interface remains the same
}