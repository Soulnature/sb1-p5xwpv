export interface TripPlan {
  country: string;
  purpose: string;
  departureDate: string;
  returnDate: string;
}

export interface I131FormData {
  // Personal Information
  fullName: string;
  alienNumber: string;
  dateOfBirth: string;
  countryOfBirth: string;
  citizenship: string;
  gender: string;
  ssn: string;
  
  // Contact Information
  currentAddress: string;
  mailingAddress: string;
  phone: string;
  email: string;
  
  // Immigration Status
  immigrationStatus: string;
  dateOfPermanentResidence: string;
  classOfAdmission: string;
  
  // Travel Document Information
  documentType: 'reentry_permit' | 'refugee_travel_document' | 'advance_parole';
  previousPermitNumber: string;
  previousPermitDate: string;
  
  // Travel Plans
  plannedTrips: TripPlan[];
  totalTimeAbroad: string;
  purposeOfTrip: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  emergencyContactEmail: string;
  
  // Additional Information
  previousApplications: string;
  criminalHistory: string;
  additionalInformation: string;
}