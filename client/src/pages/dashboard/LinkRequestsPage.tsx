// Placeholder LinkRequestsPage Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { LinkRequest, User, Pet } from '../../types'; // Assuming LinkRequest type exists
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Define the populated LinkRequest type
interface PopulatedLinkRequest extends Omit<LinkRequest, 'owner' | 'pet'> {
    owner: Pick<User, '_id' | 'firstName' | 'lastName' | 'email'>;
    pet: Pick<Pet, '_id' | 'name' | 'species' | 'breed'>;
}

const LinkRequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<PopulatedLinkRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<{ [reqId: string]: 'processing' | 'success' | 'error' | null }>({});

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    setResponseStatus({});
    try {
      const response = await api.get('/link-requests/pending');
      if (response.data?.status === 'success') {
        setRequests(response.data.data.linkRequests);
      } else {
        throw new Error('Failed to fetch link requests');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Could not load link requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleResponse = async (requestId: string, status: 'approved' | 'rejected') => {
      setResponseStatus(prev => ({ ...prev, [requestId]: 'processing' }));
      try {
          await api.patch(`/link-requests/${requestId}/respond`, { status });
          setResponseStatus(prev => ({ ...prev, [requestId]: 'success' }));
          // Refresh the list after successful response
          fetchRequests(); 
      } catch (err: any) {
          setResponseStatus(prev => ({ ...prev, [requestId]: 'error' }));
          // Display error message specific to this action?
          setError(`Failed to ${status === 'approved' ? 'approve' : 'reject'} request: ${err?.response?.data?.message || err.message}`);
          // Optionally reset status after delay
          // setTimeout(() => setResponseStatus(prev => ({ ...prev, [requestId]: null })), 5000);
      }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch { return 'Invalid Date'; }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Pending Link Requests</h1>

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

      {!loading && !error && requests.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-slate-600">You have no pending link requests.</p>
        </div>
      )}

      {!loading && !error && requests.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-slate-200">
            {requests.map((req) => (
              <li key={req._id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  {/* Request Details */}
                  <div>
                    <p className="text-md font-medium text-slate-900">
                      Request from: <span className="font-semibold">{req.owner.firstName} {req.owner.lastName}</span> ({req.owner.email})
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      To link pet: <span className="font-medium">{req.pet.name}</span> ({req.pet.species} - {req.pet.breed})
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Received: {formatDate(req.requestDate)}</p>
                  </div>
                  {/* Action Buttons */}
                  <div className="flex-shrink-0 flex gap-3">
                    <button
                      onClick={() => handleResponse(req._id, 'approved')}
                      disabled={!!responseStatus[req._id]}
                      className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                        ${responseStatus[req._id] === 'processing' ? 'bg-slate-400 cursor-wait' : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'}
                        ${responseStatus[req._id] === 'success' || responseStatus[req._id] === 'error' ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                        {responseStatus[req._id] === 'processing' ? <LoadingSpinner size="small" color="inherit" className="mr-1"/> : <CheckIcon className="h-4 w-4 mr-1" />}
                        Approve
                    </button>
                    <button
                       onClick={() => handleResponse(req._id, 'rejected')}
                       disabled={!!responseStatus[req._id]}
                       className={`inline-flex items-center px-3 py-1.5 border border-slate-300 text-xs font-medium rounded-md shadow-sm text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
                        ${responseStatus[req._id] === 'processing' || responseStatus[req._id] === 'success' || responseStatus[req._id] === 'error' ? 'opacity-50 cursor-not-allowed' : ''}
                       `}
                    >
                       {responseStatus[req._id] === 'processing' ? <LoadingSpinner size="small" color="inherit" className="mr-1"/> : <XMarkIcon className="h-4 w-4 mr-1" />}
                        Reject
                    </button>
                  </div>
                </div>
                {/* Show processing/error status for this specific request */}
                {responseStatus[req._id] === 'error' && (
                    <p className="text-xs text-red-600 mt-2">Could not process response. Please try again.</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
        <div className="mt-6 text-center">
            <Link to="/vet/dashboard" className="text-sm text-sky-600 hover:underline">
                Back to Dashboard
            </Link>
        </div>
    </div>
  );
};

export default LinkRequestsPage; 