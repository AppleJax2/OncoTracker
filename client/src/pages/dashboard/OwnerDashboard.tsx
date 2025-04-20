// Placeholder OwnerDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../../types';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { PlusIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contexts/AuthContext';

const OwnerDashboard: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/pets');
        if (response.data && response.data.status === 'success') {
          setPets(response.data.data.pets);
        } else {
          throw new Error('Failed to fetch pets');
        }
      } catch (err: any) {
        console.error('Error fetching pets:', err);
        const message = err?.response?.data?.message || err.message || 'Could not load your pets.';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-50 to-warm-50 rounded-2xl p-6 shadow-soft">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.firstName || 'Pet Parent'}
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Track your pet's cancer treatment progress, monitor symptoms, and share reports with your veterinarian all in one place.
            </p>
          </div>
          <Link
            to="/owner/pets/new"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Pet
          </Link>
        </div>
      </div>
      
      {loading && (
        <div className="text-center py-12 bg-white rounded-xl shadow-card">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-500">Loading your pets...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-5 rounded-xl shadow-soft mb-6" role="alert">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error loading your pets</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && pets.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-card">
          <div className="rounded-full bg-primary-100 p-3 inline-flex mx-auto">
            <HeartIcon className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-800">No pets found</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Get started by adding your pet's information. This will help us track their cancer treatment and symptoms.
          </p>
          <Link
            to="/owner/pets/new"
            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Pet
          </Link>
        </div>
      )}

      {!loading && !error && pets.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Pets</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => (
              <Link key={pet._id} to={`/owner/pets/${pet._id}`} className="block group">
                <div className="bg-white rounded-xl shadow-card overflow-hidden transition duration-300 ease-in-out group-hover:shadow-hover border border-gray-100">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className="rounded-full bg-warm-100 p-2 mr-3">
                        <HeartIcon className="h-5 w-5 text-warm-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary-600 truncate">{pet.name}</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 capitalize flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Type:</span>
                        {pet.species} - {pet.breed}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Age:</span>
                        {pet.age || 'N/A'}
                      </p>
                      <p className="text-sm text-gray-600 capitalize flex items-center">
                        <span className="font-medium text-gray-700 mr-2">Treatment:</span>
                        {pet.treatmentType || 'Not specified'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-4 text-right border-t border-gray-100">
                    <span className="text-sm font-medium text-primary-600 flex items-center justify-end">
                      View Details <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            <div className="relative block w-full h-full min-h-[200px] rounded-xl border-2 border-dashed border-gray-300 p-6 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
              <Link to="/owner/pets/new" className="h-full flex flex-col items-center justify-center">
                <div className="rounded-full bg-primary-50 p-3 mb-4">
                  <PlusIcon className="h-8 w-8 text-primary-600" aria-hidden="true" />
                </div>
                <span className="mt-2 block text-sm font-medium text-gray-900">Add another pet</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Resources Section */}
      {!loading && !error && pets.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Helpful Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-xl p-6 shadow-soft border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-800 mb-2">Symptom Tracking Guide</h3>
              <p className="text-teal-700 mb-4">Learn how to effectively track and report your pet's symptoms to help your veterinarian provide the best care.</p>
              <button className="text-teal-600 font-medium text-sm hover:text-teal-800">
                Read Guide →
              </button>
            </div>
            <div className="bg-warm-50 rounded-xl p-6 shadow-soft border border-warm-100">
              <h3 className="text-lg font-semibold text-warm-800 mb-2">Support for Pet Parents</h3>
              <p className="text-warm-700 mb-4">Find resources and support groups to help you navigate your pet's cancer journey.</p>
              <button className="text-warm-600 font-medium text-sm hover:text-warm-800">
                Find Support →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard; 