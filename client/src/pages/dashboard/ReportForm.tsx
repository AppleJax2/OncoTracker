// Placeholder ReportForm Component
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../services/apiService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Pet, VCOGDefinition } from '../../types';
import { getSimplifiedVCOG } from '../../utils/vcogUtils'; // Assume utility exists

interface SymptomEntry {
    symptom: string;
    grade: number;
    notes?: string;
}

const ReportForm: React.FC = () => {
    const { petId } = useParams<{ petId: string }>();
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet | null>(null);
    const [symptomEntries, setSymptomEntries] = useState<SymptomEntry[]>([]);
    const [overallWellbeing, setOverallWellbeing] = useState<number>(3); // Default to neutral
    const [ownerNotes, setOwnerNotes] = useState<string>('');
    const [loadingPet, setLoadingPet] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // VCOG Definitions based on treatment type
    const [vcogDefinitions, setVcogDefinitions] = useState<VCOGDefinition[]>([]);

    useEffect(() => {
        const fetchPet = async () => {
            if (!petId) return;
            setLoadingPet(true);
            setError(null);
            try {
                const response = await apiService.get(`/pets/${petId}`);
                if (response.data?.status === 'success') {
                    const fetchedPet: Pet = response.data.data.pet;
                    setPet(fetchedPet);
                    // Load relevant VCOG definitions based on pet's treatment type
                    const definitions = getSimplifiedVCOG(fetchedPet.treatmentType);
                    setVcogDefinitions(definitions);
                    // Initialize symptom entries based on definitions
                    setSymptomEntries(definitions.map(def => ({ symptom: def.symptom, grade: 0, notes: '' })));
                } else {
                    throw new Error('Failed to fetch pet details');
                }
            } catch (err: any) {
                setError(err?.response?.data?.message || err.message || 'Could not load pet information.');
            } finally {
                setLoadingPet(false);
            }
        };
        fetchPet();
    }, [petId]);

    const handleGradeChange = (symptom: string, grade: number) => {
        setSymptomEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.symptom === symptom ? { ...entry, grade } : entry
            )
        );
    };
    
    const handleNotesChange = (symptom: string, notes: string) => {
        setSymptomEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.symptom === symptom ? { ...entry, notes } : entry
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        const reportPayload = {
            pet: petId,
            reportDate: new Date().toISOString(), // Use current date
            overallWellbeing: overallWellbeing,
            ownerNotes: ownerNotes,
            entries: symptomEntries.map(({ symptom, grade, notes }) => ({ symptom, grade, notes: notes?.trim() || undefined })),
            // scaleType is set automatically by backend based on pet
        };

        try {
            const response = await apiService.post(`/pets/${petId}/reports`, reportPayload);
            if (response.data?.status === 'success') {
                navigate(`/owner/pets/${petId}`); // Navigate back to pet detail on success
            } else {
                throw new Error(response.data?.message || 'Failed to submit report');
            }
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || 'Could not submit report.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingPet) {
        return <div className="text-center py-10"><LoadingSpinner size="large" /></div>;
    }

    if (error && !pet) { // Only show full page error if pet couldn't load
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          );
    }

    if (!pet) {
        return <div className="text-center py-10 text-slate-600">Pet not found.</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Submit Report for {pet.name}</h1>
            <p className="text-sm text-slate-500 mb-6">Report symptoms observed since the last report (or within the last 24 hours).</p>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Symptom Grades */}
                <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-slate-700 border-b pb-2">Symptom Grades (0 = Normal)</h2>
                    {vcogDefinitions.map((def: VCOGDefinition, index: number) => {
                        const currentEntry = symptomEntries.find(e => e.symptom === def.symptom) || { grade: 0 };
                        return (
                            <div key={def.symptom} className="p-4 rounded-md border border-slate-200 bg-slate-50/50">
                                <label className="block text-md font-medium text-slate-800 mb-3">{def.symptom}</label>
                                <div className="text-xs text-slate-500 mb-3 italic">{def.description}</div>
                                <fieldset className="mt-2">
                                    <legend className="sr-only">Grade for {def.symptom}</legend>
                                    <div className="flex flex-wrap gap-x-6 gap-y-3">
                                        {[0, 1, 2, 3, 4].map((gradeValue) => (
                                            <div key={gradeValue} className="flex items-center">
                                                <input
                                                    id={`${def.symptom}-grade-${gradeValue}`}
                                                    name={`${def.symptom}-grade`}
                                                    type="radio"
                                                    value={gradeValue}
                                                    checked={currentEntry.grade === gradeValue}
                                                    onChange={() => handleGradeChange(def.symptom, gradeValue)}
                                                    disabled={submitting}
                                                    className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-slate-300"
                                                />
                                                <label htmlFor={`${def.symptom}-grade-${gradeValue}`} className="ml-2 block text-sm font-medium text-slate-700">
                                                    Grade {gradeValue} <span className="text-xs text-slate-500">({def.grades[gradeValue]})</span>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                                {/* Optional Notes per Symptom */}
                                {currentEntry.grade > 0 && (
                                    <div className="mt-4">
                                        <label htmlFor={`${def.symptom}-notes`} className="block text-sm font-medium text-slate-700 mb-1">Optional Notes for {def.symptom}:</label>
                                        <textarea
                                            id={`${def.symptom}-notes`}
                                            name={`${def.symptom}-notes`}
                                            rows={2}
                                            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50"
                                            placeholder={`Any specific details about ${def.symptom.toLowerCase()}? (e.g., frequency, appearance)`}
                                            value={symptomEntries.find(e => e.symptom === def.symptom)?.notes || ''}
                                            onChange={(e) => handleNotesChange(def.symptom, e.target.value)}
                                            disabled={submitting}
                                            maxLength={500}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Overall Wellbeing */}
                <div>
                  <label htmlFor="overallWellbeing" className="block text-lg font-semibold text-slate-700 mb-2">Overall Wellbeing</label>
                  <p className="text-sm text-slate-500 mb-3">How has {pet.name}'s general wellbeing been since the last report (1=Very Poor, 5=Excellent)?</p>
                  <select 
                    name="overallWellbeing" 
                    id="overallWellbeing" 
                    value={overallWellbeing} 
                    onChange={(e) => setOverallWellbeing(parseInt(e.target.value, 10))} 
                    disabled={submitting}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                  >
                    <option value="1">1 - Very Poor</option>
                    <option value="2">2 - Poor</option>
                    <option value="3">3 - Fair</option>
                    <option value="4">4 - Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                {/* General Owner Notes */}
                <div>
                    <label htmlFor="ownerNotes" className="block text-lg font-semibold text-slate-700 mb-2">Additional Notes</label>
                    <p className="text-sm text-slate-500 mb-3">Any other comments or observations for the veterinary team?</p>
                    <textarea
                        id="ownerNotes"
                        name="ownerNotes"
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50"
                        placeholder="e.g., Change in behavior, specific concerns..."
                        value={ownerNotes}
                        onChange={(e) => setOwnerNotes(e.target.value)}
                        disabled={submitting}
                        maxLength={1000}
                    />
                </div>
                
                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button type="button" onClick={() => navigate(`/owner/pets/${petId}`)} disabled={submitting} className="mr-4 inline-flex justify-center py-2 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? <LoadingSpinner size="small" color="text-white" /> : 'Submit Report'}
                  </button>
                </div>
            </form>
        </div>
    );
};

export default ReportForm; 