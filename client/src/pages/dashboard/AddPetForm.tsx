// Placeholder AddPetForm Component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext'; // Needed for owner ID, though set by backend ideally

const AddPetForm: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog', // Default species
    breed: '',
    dateOfBirth: '',
    weightKg: '',
    diagnosis: '',
    treatmentType: 'chemo', // Default treatment type
    reportingSchedule: 'manual', // Default schedule
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation (can add more)
    if (!formData.name || !formData.species || !formData.treatmentType) {
        setError('Pet name, species, and treatment type are required.');
        setLoading(false);
        return;
    }

    // Construct payload selectively
    const payload: any = {
        name: formData.name,
        species: formData.species,
        treatmentType: formData.treatmentType,
        reportingSchedule: formData.reportingSchedule,
        // Backend sets owner based on logged-in user
    };

    if (formData.breed) payload.breed = formData.breed;
    if (formData.dateOfBirth) payload.dateOfBirth = formData.dateOfBirth;
    const weight = formData.weightKg ? parseFloat(formData.weightKg) : NaN;
    if (!isNaN(weight)) payload.weightKg = weight;
    if (formData.diagnosis) payload.diagnosis = formData.diagnosis;

    try {
      const response = await apiService.post('/pets', payload);
      if (response.data && response.data.status === 'success') {
        // Navigate to the new pet's detail page or back to dashboard
        navigate(`/owner/pets/${response.data.data.pet._id}`);
      } else {
        throw new Error(response.data?.message || 'Failed to add pet');
      }
    } catch (err: any) {
      console.error('Error adding pet:', err);
      const message = err?.response?.data?.message || err.message || 'Could not add pet. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Add New Pet Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
        )}

        {/* Pet Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">Pet Name *</label>
          <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
        </div>

        {/* Species */}
        <div>
          <label htmlFor="species" className="block text-sm font-medium text-slate-700">Species *</label>
          <select name="species" id="species" required value={formData.species} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
          </select>
        </div>

        {/* Breed */}
        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-slate-700">Breed</label>
          <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="e.g., Labrador Retriever, Domestic Shorthair"/>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">Date of Birth</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weightKg" className="block text-sm font-medium text-slate-700">Last Known Weight (kg)</label>
          <input type="number" name="weightKg" id="weightKg" step="0.1" min="0" value={formData.weightKg} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="e.g., 25.5"/>
        </div>

        {/* Diagnosis */}
        <div>
          <label htmlFor="diagnosis" className="block text-sm font-medium text-slate-700">Diagnosis</label>
          <input type="text" name="diagnosis" id="diagnosis" value={formData.diagnosis} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm" placeholder="e.g., Lymphoma, Osteosarcoma"/>
        </div>

        {/* Treatment Type */}
        <div>
          <label htmlFor="treatmentType" className="block text-sm font-medium text-slate-700">Treatment Type *</label>
          <select name="treatmentType" id="treatmentType" required value={formData.treatmentType} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="chemo">Chemotherapy</option>
            <option value="radiation">Radiation Therapy</option>
          </select>
        </div>

        {/* Reporting Schedule */}
        <div>
          <label htmlFor="reportingSchedule" className="block text-sm font-medium text-slate-700">Reporting Frequency</label>
          <select name="reportingSchedule" id="reportingSchedule" value={formData.reportingSchedule} onChange={handleChange} disabled={loading} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm">
            <option value="manual">Manually (No Reminders)</option>
            <option value="daily">Daily</option>
            <option value="every_3_days">Every 3 Days</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button type="button" onClick={() => navigate('/owner/dashboard')} disabled={loading} className="mr-4 inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <LoadingSpinner size="small" color="text-white" /> : 'Add Pet'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPetForm; 