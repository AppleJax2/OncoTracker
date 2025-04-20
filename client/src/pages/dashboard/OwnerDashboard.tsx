// Placeholder OwnerDashboard Component
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pet } from '../../types';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { PlusIcon } from '@heroicons/react/24/solid';

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
        const response = await api.get('/pets'); // Use api
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
  }, []); // Run only on component mount

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Your Pets</h1>
        <Link
          to="/owner/pets/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add New Pet
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

      {!loading && !error && pets.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-slate-700">No pets found.</h3>
          <p className="text-slate-500 mt-2">Get started by adding your pet's information.</p>
          <Link
            to="/owner/pets/new"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Add Pet
          </Link>
        </div>
      )}

      {!loading && !error && pets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <Link key={pet._id} to={`/owner/pets/${pet._id}`} className="block group">
              <div className="bg-white rounded-lg shadow overflow-hidden transition duration-300 ease-in-out group-hover:shadow-lg">
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-slate-800 group-hover:text-sky-600 truncate">{pet.name}</h3>
                  <p className="text-sm text-slate-500 capitalize">{pet.species} - {pet.breed}</p>
                  <p className="text-sm text-slate-500 mt-1">Age: {pet.age || 'N/A'}</p>
                  <p className="text-sm text-slate-500 mt-1 capitalize">Treatment: {pet.treatmentType}</p>
                  {/* Add more details or indicators if needed */}
                </div>
                {/* Optional Footer/Action area */}
                {/* <div className="bg-slate-50 px-5 py-3 text-right">
                  <span className="text-xs font-medium text-sky-600">View Details &rarr;</span>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard; 