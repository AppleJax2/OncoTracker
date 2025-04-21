// Placeholder VetDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../../types';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  UserGroupIcon, 
  HeartIcon, 
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  BellAlertIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const VetDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const [pendingRequests, setPendingRequests] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch patients
        const patientsResponse = await api.get('/api/pets');
        if (patientsResponse.data && patientsResponse.data.status === 'success') {
          setPatients(patientsResponse.data.data.pets);
        } else {
          throw new Error('Failed to fetch patient list');
        }

        // Get pending link requests count (mock data for now)
        setPendingRequests(Math.floor(Math.random() * 5)); // Mock data for UI
        
      } catch (err: any) {
        console.error('Error fetching data:', err);
        const message = err?.response?.data?.message || err.message || 'Could not load your dashboard data.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(
    patient => 
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.species && patient.species.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (patient.breed && patient.breed.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-6 shadow-soft">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, Dr. {user?.lastName || 'Veterinarian'}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Monitor your patients' cancer treatments, review symptom reports, and provide your expertise all in one centralized dashboard.
            </p>
          </div>
          <Link
            to="/vet/link-requests"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            <UserGroupIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            View Link Requests
            {pendingRequests > 0 && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-primary-700">
                {pendingRequests}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="bg-primary-100 p-3 rounded-lg mr-4">
              <HeartIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{patients.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="bg-teal-100 p-3 rounded-lg mr-4">
              <ClipboardDocumentCheckIcon className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Treatments</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {patients.filter(p => p.treatmentType).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <div className="flex items-start">
            <div className="bg-warm-100 p-3 rounded-lg mr-4">
              <BellAlertIcon className="h-6 w-6 text-warm-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Needs Attention</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {/* Placeholder for pets that need attention */}
                {Math.min(3, Math.floor(patients.length / 3))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-card rounded-xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-2xl font-bold text-gray-900">Your Patients</h2>
            
            {/* Search input */}
            <div className="relative w-full sm:w-64">
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-500">Loading your patients...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 m-6 px-6 py-5 rounded-lg" role="alert">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">There was an error loading your patients</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && filteredPatients.length === 0 && (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <p className="text-lg font-medium text-gray-700">No patients match your search</p>
                <p className="text-gray-500 mt-2">Try adjusting your search or view all patients</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                  <HeartIcon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">No patients linked</h3>
                <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                  Pet owners can link their pets to you via the app. You'll receive notifications when new link requests arrive.
                </p>
              </>
            )}
          </div>
        )}

        {!loading && !error && filteredPatients.length > 0 && (
          <ul role="list" className="divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <li key={patient._id}>
                <Link to={`/vet/patients/${patient._id}`} className="block hover:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="px-6 py-5 flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center">
                        <div className="bg-warm-50 p-2 rounded-full mr-4">
                          <HeartIcon className="h-6 w-6 text-warm-500" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-primary-600 truncate">{patient.name}</p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <span className="truncate capitalize">{patient.species} - {patient.breed}</span>
                            <span className="mx-2 text-gray-300">•</span>
                            <span>Age: {patient.age || 'N/A'}</span>
                            {patient.treatmentType && (
                              <>
                                <span className="mx-2 text-gray-300">•</span>
                                <span className="capitalize">{patient.treatmentType} treatment</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <div className="flex space-x-2">
                        {/* Show alert indicator if patient needs attention */}
                        {patient._id.charAt(0) === 'a' && ( // Just a random condition for demo
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warm-100 text-warm-800">
                            Needs review
                          </span>
                        )}
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Quick Resources Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <p className="text-gray-500 text-sm">View your recent patients and activity.</p>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-800">
            View All Activity →
          </button>
        </div>
        
        <div className="bg-primary-50 rounded-xl shadow-card p-6 border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-900 mb-3">Clinical Resources</h3>
          <p className="text-primary-700 text-sm">Access clinical guidelines, research, and treatment protocols.</p>
          <button className="mt-4 text-primary-600 text-sm font-medium hover:text-primary-800">
            View Resources →
          </button>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard; 