export interface AddressHistory {
  address: string;
  fromDate: string;
  toDate: string;
  isCurrent: boolean;
}

export interface TravelHistory {
  country: string;
  purpose: string;
  fromDate: string;
  toDate: string;
}

export interface I485FormData {
  // Personal Information
  fullName: string;
  otherNames: string;
  birthDate: string;
  birthPlace: string;
  nationality: string;
  alienNumber: string;
  socialSecurityNumber: string;
  uscisAccountNumber: string;
  
  // Contact Information
  currentAddress: string;
  mailingAddress: string;
  phone: string;
  mobile: string;
  email: string;
  
  // Immigration Information
  lastEntryDate: string;
  i94Number: string;
  lastEntryStatus: string;
  currentStatus: string;
  statusExpirationDate: string;
  passportNumber: string;
  passportCountry: string;
  passportExpiration: string;
  
  // Application Details
  applicationCategory: string;
  priorityDate: string;
  principalApplicant: string;
  
  // Background Information
  addressHistory: AddressHistory[];
  travelHistory: TravelHistory[];
  employmentHistory: {
    employer: string;
    position: string;
    fromDate: string;
    toDate: string;
    address: string;
    isCurrent: boolean;
  }[];
  
  // Family Information
  maritalStatus: string;
  spouseName: string;
  spouseBirthDate: string;
  spouseMarriageDate: string;
  spouseMarriagePlace: string;
  hasChildren: boolean;
  childrenDetails: string;
  
  // Additional Information
  criminalHistory: string;
  immigrationViolations: string;
  publicAssistance: string;
  additionalInformation: string;
}