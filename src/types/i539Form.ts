export interface I539FormData {
  // Personal Information
  fullName: string;
  otherNames: string;
  dateOfBirth: string;
  countryOfBirth: string;
  countryOfCitizenship: string;
  alienNumber: string;
  i94Number: string;
  passportNumber: string;
  passportExpiryDate: string;
  
  // Contact Information
  currentAddress: string;
  mailingAddress: string;
  phone: string;
  email: string;
  
  // Current Status Information
  currentStatus: string;
  dateOfLastEntry: string;
  placeOfLastEntry: string;
  statusExpirationDate: string;
  
  // Extension/Change Details
  requestedStatus: string;
  extensionReason: string;
  requestedDuration: string;
  
  // Employment Information
  currentEmployer: string;
  employerAddress: string;
  jobTitle: string;
  
  // Additional Information
  criminalHistory: boolean;
  criminalHistoryDetails: string;
  immigrationViolations: boolean;
  violationDetails: string;
  additionalInformation: string;
  
  // Dependents
  hasDependents: boolean;
  dependentDetails: string;
}