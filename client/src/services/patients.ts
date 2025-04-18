import api from './api';
import { Patient, Study } from '../types';

interface CreatePatientData {
  name: string;
  owner: {
    name: string;
    email: string;
    phone?: string;
  };
  species: string;
  breed?: string;
  dateOfBirth?: string;
  diagnosis: string;
  treatmentType: 'radiation' | 'chemo' | 'other';
  notes?: string;
}

export const getPatients = async (): Promise<Patient[]> => {
  const response = await api.get<Patient[]>('/patients');
  return response.data;
};

export const getPatient = async (id: string): Promise<Patient> => {
  const response = await api.get<Patient>(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patientData: CreatePatientData): Promise<Patient> => {
  const response = await api.post<Patient>('/patients', patientData);
  return response.data;
};

export const updatePatient = async (id: string, patientData: Partial<CreatePatientData>): Promise<Patient> => {
  const response = await api.put<Patient>(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id: string): Promise<void> => {
  await api.delete(`/patients/${id}`);
};

export const archivePatient = async (id: string): Promise<Patient> => {
  const response = await api.put<Patient>(`/patients/${id}/archive`);
  return response.data;
};

export const getPatientStudies = async (patientId: string): Promise<Study[]> => {
  const response = await api.get<Study[]>(`/patients/${patientId}/studies`);
  return response.data;
}; 