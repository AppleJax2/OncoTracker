// User (Veterinarian) types
export interface User {
  id: string;
  name: string;
  email: string;
  practice?: {
    name?: string;
    address?: string;
    phone?: string;
  };
  role: 'admin' | 'vet';
  createdAt: string;
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
    role: 'owner' | 'vet' | 'system';
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