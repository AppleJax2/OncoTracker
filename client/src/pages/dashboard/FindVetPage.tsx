// Placeholder FindVetPage Component
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import apiService from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { User } from '../../types';
import { MagnifyingGlassIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const FindVetPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const petId = searchParams.get('petId'); // Get petId from query params if linking a specific pet

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<User[]>([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);
    const [requestStatus, setRequestStatus] = useState<{ [vetId: string]: 'sending' | 'success' | 'error' | null }>({});
    const [requestError, setRequestError] = useState<string | null>(null);

    useEffect(() => {
        // Pre-fill search if term is provided in query params (optional)
        const initialSearch = searchParams.get('search');
        if (initialSearch) {
            setSearchTerm(initialSearch);
            handleSearch(initialSearch);
        }
    }, [searchParams]);

    const handleSearch = async (term: string) => {
        if (!term.trim()) {
            setResults([]);
            setSearchError(null);
            return;
        }
        setLoadingSearch(true);
        setSearchError(null);
        setRequestStatus({}); // Clear previous request statuses
        setRequestError(null);
        try {
            const response = await apiService.get(`/link-requests/find-vets?searchTerm=${encodeURIComponent(term)}`);
            if (response.data?.status === 'success') {
                setResults(response.data.data.vets);
                if (response.data.data.vets.length === 0) {
                    setSearchError('No verified veterinarians found matching your search.');
                }
            } else {
                throw new Error('Failed to search for veterinarians');
            }
        } catch (err: any) {
            setSearchError(err?.response?.data?.message || err.message || 'Error searching for veterinarians.');
            setResults([]);
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleSendRequest = async (vetId: string) => {
        if (!petId) {
            setRequestError('Cannot send request: Pet ID is missing from the URL.');
            return;
        }
        setRequestStatus(prev => ({ ...prev, [vetId]: 'sending' }));
        setRequestError(null);
        try {
            await apiService.post('/link-requests', { vetId, petId });
            setRequestStatus(prev => ({ ...prev, [vetId]: 'success' }));
        } catch (err: any) {
            setRequestStatus(prev => ({ ...prev, [vetId]: 'error' }));
            setRequestError(err?.response?.data?.message || err.message || 'Failed to send link request.');
            // Optionally reset status after a delay
            // setTimeout(() => setRequestStatus(prev => ({ ...prev, [vetId]: null })), 5000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 mb-4">Link Pet to Veterinarian</h1>
            {petId ? (
                <p className="text-slate-600 mb-6">Search for your veterinarian by name or clinic name to send them a request to link this pet ({/* TODO: Fetch pet name? */}Pet ID: {petId}). They will need to approve the request before they can see your pet's reports.</p>
            ) : (
                <p className="text-slate-600 mb-6 bg-yellow-100 border border-yellow-300 p-3 rounded">Please access this page from a specific pet's detail page to link them.</p>
            )}

            {/* Search Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSearch(searchTerm); }} className="mb-6 flex gap-2">
                <input 
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Vet Name or Clinic Name..."
                    className="flex-grow mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    disabled={!petId} // Disable if no petId
                />
                <button 
                    type="submit"
                    disabled={loadingSearch || !petId}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50"
                >
                    {loadingSearch ? <LoadingSpinner size="small" color="text-white"/> : <MagnifyingGlassIcon className="h-5 w-5"/>}
                    <span className="ml-2">Search</span>
                </button>
            </form>

            {/* Search Results / Errors */}
            {searchError && (
                 <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
                     <span className="block sm:inline">{searchError}</span>
                 </div>
            )}
            {requestError && (
                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                     <strong className="font-bold">Request Error: </strong>
                     <span className="block sm:inline">{requestError}</span>
                 </div>
            )}

            {/* Results List */}
            {results.length > 0 && (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul role="list" className="divide-y divide-slate-200">
                        {results.map(vet => (
                            <li key={vet._id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                <div>
                                    <p className="text-md font-medium text-slate-800">Dr. {vet.firstName} {vet.lastName}</p>
                                    <p className="text-sm text-slate-500">{vet.clinicName}</p>
                                </div>
                                <button
                                    onClick={() => handleSendRequest(vet._id)}
                                    disabled={!petId || !!requestStatus[vet._id]} // Disable if no petId or request status exists
                                    className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 
                                        ${requestStatus[vet._id] === 'success' 
                                            ? 'bg-green-500 cursor-not-allowed' 
                                            : requestStatus[vet._id] === 'error' 
                                            ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' 
                                            : requestStatus[vet._id] === 'sending' 
                                            ? 'bg-slate-400 cursor-wait' 
                                            : 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'}
                                        ${!petId ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {requestStatus[vet._id] === 'sending' && <LoadingSpinner size="small" color="text-white" className="mr-2"/>}
                                    {requestStatus[vet._id] === 'success' && <CheckCircleIcon className="h-4 w-4 mr-1"/>}
                                    {requestStatus[vet._id] === 'error' && <XCircleIcon className="h-4 w-4 mr-1"/>}
                                    {requestStatus[vet._id] === 'success' ? 'Request Sent' : requestStatus[vet._id] === 'error' ? 'Retry Request' : requestStatus[vet._id] === 'sending' ? 'Sending...' : 'Send Link Request'}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
             <div className="mt-6 text-center">
                <Link to={petId ? `/owner/pets/${petId}` : '/owner/dashboard'} className="text-sm text-sky-600 hover:underline">
                    {petId ? 'Back to Pet Details' : 'Back to Dashboard'}
                </Link>
            </div>
        </div>
    );
};

export default FindVetPage; 