// Placeholder PetDetail Component
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import { Pet, Report, ReportEntry } from '../../types'; // Assuming Report type exists
import ReportHistoryChart from '../../components/dashboard/ReportHistoryChart'; // Assume chart component exists
import { PencilSquareIcon, TrashIcon, LinkIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const PetDetail: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth(); // Needed for role checks potentially
  const [pet, setPet] = useState<Pet | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loadingPet, setLoadingPet] = useState(true);
  const [loadingReports, setLoadingReports] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetAndReports = async () => {
      if (!petId) return;
      setLoadingPet(true);
      setLoadingReports(true);
      setError(null);

      try {
        // Fetch Pet Details
        const petResponse = await apiService.get(`/pets/${petId}`);
        if (petResponse.data?.status === 'success') {
          setPet(petResponse.data.data.pet);
        } else {
          throw new Error(petResponse.data?.message || 'Failed to fetch pet details');
        }
        setLoadingPet(false);

        // Fetch Reports
        const reportResponse = await apiService.get(`/pets/${petId}/reports`);
        if (reportResponse.data?.status === 'success') {
          setReports(reportResponse.data.data.reports);
        } else {
          throw new Error(reportResponse.data?.message || 'Failed to fetch reports');
        }
        setLoadingReports(false);

      } catch (err: any) {
        console.error('Error fetching pet data:', err);
        const message = err?.response?.data?.message || err.message || 'Could not load pet information.';
        setError(message);
        setLoadingPet(false);
        setLoadingReports(false);
      }
    };

    fetchPetAndReports();
  }, [petId]);

  const handleDeletePet = async () => {
      if (!petId || !window.confirm('Are you sure you want to archive this pet? This action cannot be undone easily.')) return;
      
      try {
          await apiService.delete(`/pets/${petId}`);
          navigate('/owner/dashboard'); // Redirect after deletion
      } catch (err: any) {           
          const message = err?.response?.data?.message || err.message || 'Failed to archive pet.';
          setError(message);
          // Maybe show error in a toast/modal instead of replacing main error
      }
  };

  if (loadingPet) {
    return <div className="text-center py-10"><LoadingSpinner size="large" /></div>;
  }

  if (error) {
    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <p className="mt-2"><Link to="/owner/dashboard" className="text-sky-600 hover:underline">Return to Dashboard</Link></p>
        </div>
      );
  }

  if (!pet) {
    return <div className="text-center py-10 text-slate-600">Pet not found.</div>;
  }

  // Format date utility (could be moved to utils)
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    } catch { return 'Invalid Date'; }
  };

  return (
    <div className="space-y-8">
      {/* Pet Header Section */}
      <div className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-1">{pet.name}</h1>
            <p className="text-slate-500 capitalize">{pet.species} - {pet.breed}</p>
            <p className="text-sm text-slate-500 mt-2">Age: {pet.age || 'N/A'} {pet.dateOfBirth ? `(DOB: ${formatDate(pet.dateOfBirth)})` : ''}</p>
            <p className="text-sm text-slate-500">Weight: {pet.weightKg ? `${pet.weightKg} kg` : 'N/A'}</p>
            <p className="text-sm text-slate-500 capitalize">Treatment: {pet.treatmentType}</p>
            <p className="text-sm text-slate-500">Diagnosis: {pet.diagnosis || 'N/A'}</p>
            {pet.vet && typeof pet.vet === 'object' && (
                <p className="text-sm text-slate-500 mt-2">Veterinarian: Dr. {pet.vet.firstName} {pet.vet.lastName} ({pet.vet.clinicName})</p>
            )}
        </div>
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {/* Owner Actions */} 
            {user?.role === 'owner' && (
                <>
                  {/* <button className="inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded text-slate-700 bg-white hover:bg-slate-50">
                      <PencilSquareIcon className="h-4 w-4 mr-1"/> Edit Profile
                  </button> */}
                  <Link
                      to={`/owner/pets/${petId}/report/new`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 whitespace-nowrap"
                  >
                      Submit New Report
                  </Link>
                  {!pet.vet && (
                      <Link
                          to={`/owner/find-vets?petId=${petId}`}
                          className="inline-flex items-center px-3 py-1.5 border border-sky-500 text-xs font-medium rounded text-sky-700 bg-sky-100 hover:bg-sky-200 whitespace-nowrap"
                          title="Link this pet to a veterinarian"
                      >
                          <LinkIcon className="h-4 w-4 mr-1"/> Link to Vet
                      </Link>
                  )}
                  <button 
                    onClick={handleDeletePet}
                    className="inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100 whitespace-nowrap"
                    title="Archive Pet"
                  >
                      <TrashIcon className="h-4 w-4 mr-1"/> Archive Pet
                  </button>
                </>
            )}
             {/* Add Vet specific actions here later if needed */} 
        </div>
      </div>

      {/* Report History Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">Report History</h2>
        {loadingReports && <div className="text-center py-5"><LoadingSpinner /></div>}
        {!loadingReports && reports.length === 0 && (
            <p className="text-slate-500">No reports submitted yet.</p>
        )}
        {!loadingReports && reports.length > 0 && (
            <div className="space-y-4">
                {/* Chart Placeholder/Component */}
                <div className="mb-6 p-4 border rounded-md bg-slate-50">
                    <h3 className="text-lg font-medium text-slate-600 mb-2 flex items-center">
                        <ChartBarIcon className="h-5 w-5 mr-2 text-sky-600"/> Symptom Trends (Placeholder)
                    </h3>
                    {/* <ReportHistoryChart reports={reports} /> */}
                    <p className="text-sm text-slate-500">Chart component to visualize symptom grades over time will be added here.</p>
                </div>

                {/* List of Reports */}
                <h3 className="text-lg font-medium text-slate-600 mb-2">Recent Reports:</h3>
                <ul className="divide-y divide-slate-200">
                    {reports.slice(0, 10).map((report: Report) => ( // Added type for report
                        <li key={report._id} className="py-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-slate-800">Report from {formatDate(report.reportDate)}</span>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${report.overallWellbeing && report.overallWellbeing <= 2 ? 'bg-red-100 text-red-800' : report.overallWellbeing === 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                    Overall: {report.overallWellbeing || 'N/A'} / 5
                                </span>
                            </div>
                            {report.entries && report.entries.length > 0 && (
                                <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                                    {report.entries
                                        .filter((entry: ReportEntry) => entry.grade > 0) // Added type for entry
                                        .map((entry: ReportEntry, index: number) => ( // Added type for entry and index
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
                                    <span className="font-medium">Notes:</span> {report.ownerNotes}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>
                {reports.length > 10 && (
                    <p className="text-sm text-center text-slate-500 mt-4">Showing the 10 most recent reports.</p> // Add pagination later if needed
                )}
            </div>
        )}
      </div>
      
      {/* Vet Notes Section (Only visible to linked Vet) - Implement Later */}
      {user?.role === 'vet' && (
           <div className="bg-white p-6 rounded-lg shadow">
             <h2 className="text-2xl font-semibold text-slate-700 mb-4">Veterinarian Notes</h2>
             {/* Add Vet Note List and Form Here */} 
             <p className="text-slate-500">Vet notes section placeholder.</p>
           </div>
      )}
    </div>
  );
};

export default PetDetail; 