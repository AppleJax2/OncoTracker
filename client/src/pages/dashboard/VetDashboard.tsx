// Placeholder VetDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../../types';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';

const VetDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Commented out unused variable
  // const { user } = useAuth();

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/pets');
        if (response.data && response.data.status === 'success') {
          setPatients(response.data.data.pets);
        } else {
          throw new Error('Failed to fetch patient list');
        }
      } catch (err: any) {
        console.error('Error fetching patients:', err);
        const message = err?.response?.data?.message || err.message || 'Could not load your patient list.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // TODO: Implement fetching/displaying pending link requests

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Your Patients</h1>
        {/* Add button to view Link Requests? */}
        <Link
          to="/vet/link-requests"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <UserGroupIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          View Link Requests
        </Link>
      </div>

      {loading && (
        <div className="text-center py-10">
          <LoadingSpinner size="large" />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!loading && !error && patients.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-slate-700">No patients linked.</h3>
          <p className="text-slate-500 mt-2">Owners can link their pets to you via the app.</p>
          {/* Optionally add instructions or link to manage requests */}
        </div>
      )}

      {!loading && !error && patients.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-slate-200">
            {patients.map((patient) => (
              <li key={patient._id}>
                <Link to={`/vet/patients/${patient._id}`} className="block hover:bg-slate-50">
                  <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                    <div className="flex-1 truncate">
                      <p className="text-lg font-medium text-sky-600 truncate">{patient.name}</p>
                      <div className="flex items-center space-x-3 text-sm text-slate-500">
                        <p className="capitalize truncate">{patient.species} - {patient.breed}</p>
                        <p className="truncate">Owner: {/* Need owner info populated */}</p> 
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                       {/* Add indicator for recent severe reports? */}
                      <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VetDashboard; 