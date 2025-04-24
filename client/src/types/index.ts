// User (Veterinarian) types
export interface User {
  _id: string;
  email: string;
  role: 'pet-parent' | 'vet';
  firstName: string;
  lastName: string;
  fullName?: string; // Virtual property
  clinicName?: string; // Vet only
  isVerified?: boolean; // Vet only
  createdAt: string; // Dates will likely be strings after JSON transfer
  updatedAt: string;
  // Add other fields as needed (e.g., passwordChangedAt for specific checks)
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
}

// Patient types
export interface PatientOwner {
  name: string;
  email: string;
  phone?: string;
}

export interface Patient {
  id: string;
  name: string;
  owner: PatientOwner;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  diagnosis: string;
  treatmentType: 'radiation' | 'chemo' | 'other';
  notes?: string;
  createdBy: string; // User ID
  createdAt: string;
  isArchived: boolean;
}

// Study types
export interface Symptom {
  name: string;
  description?: string;
  scale: 'rtog' | 'vcog_ctcae' | 'custom';
  minValue: number;
  maxValue: number;
}

export interface CustomQuestion {
  question: string;
  responseType: 'text' | 'number' | 'boolean' | 'scale';
  options?: string[];
  required: boolean;
}

export interface Study {
  id: string;
  title: string;
  patient: string | Patient; // Patient ID or Patient object when populated
  veterinarian: string; // User ID
  treatmentType: 'radiation' | 'chemo' | 'other';
  description?: string;
  startDate: string;
  endDate?: string;
  duration: number; // in days
  submissionFrequency: 'daily' | 'twice_daily' | 'weekly' | 'custom';
  customFrequency?: string;
  symptoms: Symptom[];
  customQuestions: CustomQuestion[];
  status: 'active' | 'completed' | 'terminated';
  accessToken: string;
  createdAt: string;
}

// Submission types
export interface SymptomSubmission {
  symptomId: string;
  name: string;
  rating: number;
  notes?: string;
}

export interface CustomResponse {
  questionId: string;
  question: string;
  response: string | number | boolean;
}

export interface Submission {
  id: string;
  study: string; // Study ID
  timestamp: string;
  symptoms: SymptomSubmission[];
  customResponses: CustomResponse[];
  additionalNotes?: string;
  submittedBy: {
    name?: string;
    role: 'pet-parent' | 'vet' | 'system';
  };
  deviceInfo?: {
    browser?: string;
    os?: string;
    device?: string;
  };
  location?: {
    latitude?: number;
    longitude?: number;
  };
  offlineSubmitted: boolean;
  synced: boolean;
}

// Toxicity scale types
export interface ToxicityGrade {
  grade: number;
  description: string;
  ownerDescription: string;
}

export interface ToxicityCategory {
  [category: string]: ToxicityGrade[];
}

export interface ToxicityScales {
  rtog: ToxicityCategory;
  vcog_ctcae: ToxicityCategory;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  errors?: string[];
}

// Form state types
export interface FormErrors {
  [key: string]: string;
}

// Chart data types
export interface TimeSeriesPoint {
  date: string;
  rating: number;
  timestamp: string;
}

export interface SymptomTimeSeries {
  name: string;
  data: TimeSeriesPoint[];
}

export interface SubmissionCount {
  date: string;
  count: number;
}

export interface AggregateData {
  submissionCounts: SubmissionCount[];
  symptomRatings: SymptomTimeSeries[];
}

// Based on the Pet model in the backend
export interface Pet {
  _id: string;
  petParent: string | User; // Can be populated with User object or just ID string (previously 'owner')
  vet?: string | User; // Optional, can be populated
  name: string;
  species: 'dog' | 'cat';
  breed?: string;
  dateOfBirth?: string; // Date as string
  weightKg?: number;
  diagnosis?: string;
  treatmentType: 'chemo' | 'radiation';
  reportingSchedule: 'daily' | 'every_3_days' | 'weekly' | 'manual';
  nextReportDueDate?: string; // Date as string
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  age?: string; // Virtual property from backend
  photoUrl?: string; // URL to pet's photo
  treatmentStatus?: 'active' | 'completed' | 'pending'; // Status of treatment
}

// Based on the Report model and sub-schema
export interface ReportEntry {
  symptom: string;
  grade: number;
  notes?: string;
}

export interface Report {
  _id: string;
  pet: string | Pet; // Can be populated
  reportDate: string; // Date as string
  reportedBy: string | User; // Can be populated
  scaleType: 'chemo' | 'radiation';
  entries?: ReportEntry[];
  overallWellbeing?: number;
  ownerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Structure for simplified VCOG definitions used in forms
export interface VCOGDefinition {
    symptom: string;
    description: string;
    grades: { [key: number]: string };
}

// Based on the VetNote model
export interface VetNote {
    _id: string;
    pet: string | Pet; // Can be populated
    vet: string | User; // Can be populated (should always be the vet viewing)
    note: string;
    createdAt: string;
    updatedAt: string;
}

// Based on the LinkRequest model
export interface LinkRequest {
    _id: string;
    petParent: string | User; // Can be populated (previously 'owner')
    vet: string | User; // Can be populated
    pet: string | Pet; // Can be populated
    status: 'pending' | 'approved' | 'rejected';
    requestDate: string;
    responseDate?: string;
    createdAt: string;
    updatedAt: string;
}

// Add other shared types like LinkRequest etc., as needed 