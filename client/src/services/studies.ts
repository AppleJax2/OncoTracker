import api from './api';
import { Study, ToxicityScales, Submission } from '../types';

interface CreateStudyData {
  title: string;
  patient: string;
  treatmentType: 'radiation' | 'chemo' | 'other';
  description?: string;
  startDate?: string;
  duration: number;
  submissionFrequency: 'daily' | 'twice_daily' | 'weekly' | 'custom';
  customFrequency?: string;
  symptoms: Array<{
    name: string;
    description?: string;
    scale: 'rtog' | 'vcog_ctcae' | 'custom';
    minValue: number;
    maxValue: number;
  }>;
  customQuestions: Array<{
    question: string;
    responseType: 'text' | 'number' | 'boolean' | 'scale';
    options?: string[];
    required: boolean;
  }>;
}

export const getStudies = async (): Promise<Study[]> => {
  const response = await api.get<Study[]>('/studies');
  return response.data;
};

export const getActiveStudies = async (): Promise<Study[]> => {
  const response = await api.get<Study[]>('/studies/active');
  return response.data;
};

export const getStudy = async (id: string): Promise<Study> => {
  const response = await api.get<Study>(`/studies/${id}`);
  return response.data;
};

export const createStudy = async (studyData: CreateStudyData): Promise<Study> => {
  const response = await api.post<Study>('/studies', studyData);
  return response.data;
};

export const updateStudy = async (id: string, studyData: Partial<CreateStudyData>): Promise<Study> => {
  const response = await api.put<Study>(`/studies/${id}`, studyData);
  return response.data;
};

export const completeStudy = async (id: string): Promise<Study> => {
  const response = await api.put<Study>(`/studies/${id}/complete`);
  return response.data;
};

export const terminateStudy = async (id: string, terminationReason?: string): Promise<Study> => {
  const response = await api.put<Study>(`/studies/${id}/terminate`, { terminationReason });
  return response.data;
};

export const getStudySubmissions = async (studyId: string): Promise<Submission[]> => {
  const response = await api.get<Submission[]>(`/studies/${studyId}/submissions`);
  return response.data;
};

export const getToxicityScales = async (): Promise<ToxicityScales> => {
  const response = await api.get<ToxicityScales>('/studies/scales');
  return response.data;
};

export const getOwnerSubmissions = async (accessToken: string): Promise<Submission[]> => {
  const response = await api.get<Submission[]>(`/submissions/study/${accessToken}`);
  return response.data;
};

export const getStudyByAccessToken = async (accessToken: string): Promise<{
  studyId: string;
  title: string;
  patient: any;
  treatmentType: string;
  description?: string;
  symptoms: any[];
  customQuestions: any[];
  symptomScales: any;
  accessToken: string;
}> => {
  const response = await api.get(`/studies/access/${accessToken}`);
  return response.data;
}; 