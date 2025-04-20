// Placeholder VetPatientDetail Component
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Pet, Report, VetNote, ReportEntry } from '../../types';
import ReportHistoryChart from '../../components/dashboard/ReportHistoryChart'; 
import VetNotesSection from '../../components/dashboard/VetNotesSection';
import { ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const VetPatientDetail: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [vetNotes, setVetNotes] = useState<VetNote[]>([]);
  const [loadingPet, setLoadingPet] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
      if (!petId) return;
      setLoadingPet(true);
      setLoadingReports(true);
      setLoadingNotes(true);
      setError(null);

      try {
          const [petRes, reportRes, notesRes] = await Promise.all([
              apiService.get(`/pets/${petId}`),
              apiService.get(`/pets/${petId}/reports`),
              apiService.get(`/pets/${petId}/vetnotes`)
          ]);

          if (petRes.data?.status === 'success') {
              setPet(petRes.data.data.pet);
          } else {
              throw new Error(petRes.data?.message || 'Failed to fetch pet details');
          }
          setLoadingPet(false);

          if (reportRes.data?.status === 'success') {
              setReports(reportRes.data.data.reports);
          } else {
              throw new Error(reportRes.data?.message || 'Failed to fetch reports');
          }
          setLoadingReports(false);

          if (notesRes.data?.status === 'success') {
              setVetNotes(notesRes.data.data.vetNotes);
          } else {
              throw new Error(notesRes.data?.message || 'Failed to fetch vet notes');
          }
          setLoadingNotes(false);

      } catch (err: any) {
          console.error('Error fetching patient data for vet:', err);
          const message = err?.response?.data?.message || err.message || 'Could not load patient information.';
          setError(message);
          setLoadingPet(false);
          setLoadingReports(false);
          setLoadingNotes(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, [petId]);

  const refreshNotes = () => {
      const fetchNotes = async () => {
          if (!petId) return;
          setLoadingNotes(true);
          try {
              const notesRes = await apiService.get(`/pets/${petId}/vetnotes`);
              if (notesRes.data?.status === 'success') {
                  setVetNotes(notesRes.data.data.vetNotes);
              } else {
                  throw new Error(notesRes.data?.message || 'Failed to fetch vet notes');
              }
          } catch (err: any) {
              console.error('Error refreshing vet notes:', err);
          } finally {
              setLoadingNotes(false);
          }
      };
      fetchNotes();
  };

  if (loadingPet) {
    return <div className="text-center py-10"><LoadingSpinner size="large" /></div>;
  }

  if (error && !pet) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2"><Link to="/vet/dashboard" className="text-sky-600 hover:underline">Return to Patient List</Link></p>
        </div>
      );
  }

  if (!pet) {
    return <div className="text-center py-10 text-slate-600">Patient not found.</div>;
  }

  const ownerName = typeof pet.owner === 'object' ? `${pet.owner.firstName} ${pet.owner.lastName}` : 'N/A';
  const ownerEmail = typeof pet.owner === 'object' ? pet.owner.email : 'N/A';

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return 'Invalid Date'; }
  };

  return (
    <div className="space-y-8">
        <Link to="/vet/dashboard" className="inline-flex items-center text-sm text-sky-600 hover:text-sky-800 mb-4">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Patient List
        </Link>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
                <h1 className="text-3xl font-bold text-slate-800 mb-1">{pet.name}</h1>
                <p className="text-slate-500 capitalize">{pet.species} - {pet.breed}</p>
                <p className="text-sm text-slate-500 mt-2">Age: {pet.age || 'N/A'} {pet.dateOfBirth ? `(DOB: ${formatDate(pet.dateOfBirth)})` : ''}</p>
                <p className="text-sm text-slate-500">Weight: {pet.weightKg ? `${pet.weightKg} kg` : 'N/A'}</p>
                <p className="text-sm text-slate-500 capitalize">Treatment: {pet.treatmentType}</p>
                <p className="text-sm text-slate-500">Diagnosis: {pet.diagnosis || 'N/A'}</p>
                <p className="text-sm text-slate-500 mt-2">Owner: {ownerName} ({ownerEmail})</p>
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Owner Reported History</h2>
        {loadingReports && <div className="text-center py-5"><LoadingSpinner /></div>}
        {error && !loadingReports && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
                Could not load reports: {error}
            </div>
        )}
        {!loadingReports && !error && reports.length === 0 && (
            <p className="text-slate-500">No reports submitted by the owner yet.</p>
        )}
        {!loadingReports && !error && reports.length > 0 && (
             <div className="space-y-4">
                <div className="mb-6 p-4 border rounded-md bg-slate-50">
                    <h3 className="text-lg font-medium text-slate-600 mb-2 flex items-center">
                        <ChartBarIcon className="h-5 w-5 mr-2 text-sky-600"/> Symptom Trends (Placeholder)
                    </h3>
                    <ReportHistoryChart reports={reports} />
                </div>

                <h3 className="text-lg font-medium text-slate-600 mb-2">Recent Reports:</h3>
                <ul className="divide-y divide-slate-200">
                    {reports.slice(0, 10).map((report: Report) => (
                        <li key={report._id} className="py-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-800">Report from {formatDate(report.reportDate)}</span>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.overallWellbeing && report.overallWellbeing <= 2 ? 'bg-red-100 text-red-800' : report.overallWellbeing === 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    Overall: {report.overallWellbeing || 'N/A'} / 5
                                </span>
                            </div>
                            {report.entries && report.entries.length > 0 && (
                                <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                                    {report.entries.filter((entry: ReportEntry) => entry.grade > 0).map((entry: ReportEntry, index: number) => (
                                        <li key={`${report._id}-entry-${index}`}>
                                            <span className="font-medium">{entry.symptom}:</span> Grade {entry.grade}
                                            {entry.notes && <span className="italic text-slate-500"> - "{entry.notes}"</span>}
                                        </li>
                                    ))}
                                    {report.entries.filter((entry: ReportEntry) => entry.grade > 0).length === 0 && (
                                        <li>No significant symptoms reported.</li>
                                    )}
                                </ul>
                            )}
                            {report.ownerNotes && (
                                <p className="text-sm text-slate-600 mt-2 pt-2 border-t border-slate-200">
                                    <span className="font-medium">Owner Notes:</span> {report.ownerNotes}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
                {reports.length > 10 && (
                    <p className="text-sm text-center text-slate-500 mt-4">Showing the 10 most recent reports.</p> 
                )}
            </div>
        )}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">Veterinarian Notes</h2>
            <VetNotesSection 
                petId={petId!} 
                notes={vetNotes} 
                loading={loadingNotes} 
                onNoteChange={refreshNotes}
            />
       </div>

    </div>
  );
};

export default VetPatientDetail; 