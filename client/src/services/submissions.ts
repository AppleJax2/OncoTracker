import api from './api';
import { Submission, AggregateData, SymptomSubmission, CustomResponse } from '../types';

interface CreateSubmissionData {
  studyId: string;
  accessToken: string;
  symptoms: SymptomSubmission[];
  customResponses: CustomResponse[];
  additionalNotes?: string;
  submittedBy?: {
    name?: string;
    role?: 'owner' | 'vet' | 'system';
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
  offlineSubmitted?: boolean;
  timestamp?: string;
}

interface SyncSubmissionsData {
  accessToken: string;
  submissions: CreateSubmissionData[];
}

export const createSubmission = async (submissionData: CreateSubmissionData): Promise<Submission> => {
  const response = await api.post<Submission>('/submissions', submissionData);
  return response.data;
};

export const getSubmission = async (id: string): Promise<Submission> => {
  const response = await api.get<Submission>(`/submissions/${id}`);
  return response.data;
};

export const updateSubmission = async (
  id: string,
  submissionData: Partial<CreateSubmissionData>
): Promise<Submission> => {
  const response = await api.put<Submission>(`/submissions/${id}`, submissionData);
  return response.data;
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await api.delete(`/submissions/${id}`);
};

export const getOwnerSubmissions = async (accessToken: string): Promise<Submission[]> => {
  const response = await api.get<Submission[]>(`/submissions/study/${accessToken}`);
  return response.data;
};

export const getAggregateData = async (studyId: string): Promise<AggregateData> => {
  const response = await api.get<AggregateData>(`/submissions/aggregate/${studyId}`);
  return response.data;
};

export const syncSubmissions = async (syncData: SyncSubmissionsData): Promise<{
  success: boolean;
  count: number;
  submissions: Submission[];
}> => {
  const response = await api.post('/submissions/sync', syncData);
  return response.data;
};

// Functions for offline support
export const storeOfflineSubmission = (submission: CreateSubmissionData): void => {
  const offlineSubmissions = getOfflineSubmissions();
  offlineSubmissions.push(submission);
  localStorage.setItem('offlineSubmissions', JSON.stringify(offlineSubmissions));
};

export const getOfflineSubmissions = (): CreateSubmissionData[] => {
  const storedSubmissions = localStorage.getItem('offlineSubmissions');
  return storedSubmissions ? JSON.parse(storedSubmissions) : [];
};

export const clearOfflineSubmissions = (): void => {
  localStorage.removeItem('offlineSubmissions');
};

export const syncOfflineSubmissions = async (): Promise<{
  success: boolean;
  count: number;
}> => {
  const offlineSubmissions = getOfflineSubmissions();
  
  if (offlineSubmissions.length === 0) {
    return { success: true, count: 0 };
  }
  
  // Group submissions by study
  const submissionsByStudy: { [key: string]: CreateSubmissionData[] } = {};
  
  offlineSubmissions.forEach(submission => {
    const { accessToken } = submission;
    if (!submissionsByStudy[accessToken]) {
      submissionsByStudy[accessToken] = [];
    }
    submissionsByStudy[accessToken].push(submission);
  });
  
  let totalSynced = 0;
  
  // Sync each group of submissions
  for (const accessToken in submissionsByStudy) {
    try {
      const result = await syncSubmissions({
        accessToken,
        submissions: submissionsByStudy[accessToken]
      });
      totalSynced += result.count;
    } catch (error) {
      console.error('Error syncing submissions:', error);
      // We'll continue with other submissions even if one group fails
    }
  }
  
  // Clear successfully synced submissions
  clearOfflineSubmissions();
  
  return {
    success: true,
    count: totalSynced
  };
}; 