// Placeholder VetNotesSection component
import React, { useState } from 'react';
import { VetNote } from '../../types';
import apiService from '../../services/apiService';
import LoadingSpinner from '../common/LoadingSpinner';
import { TrashIcon } from '@heroicons/react/24/solid';

interface VetNotesSectionProps {
  petId: string;
  notes: VetNote[];
  loading: boolean;
  onNoteChange: () => void; // Callback to refresh notes list in parent
}

const VetNotesSection: React.FC<VetNotesSectionProps> = ({ petId, notes, loading, onNoteChange }) => {
  const [newNote, setNewNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Add state for editing if needed later

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setSubmitting(true);
    setError(null);
    try {
      await apiService.post(`/pets/${petId}/vetnotes`, { note: newNote });
      setNewNote(''); // Clear input
      onNoteChange(); // Trigger refresh in parent
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
      if (!window.confirm('Are you sure you want to delete this note?')) return;
      // Note: We might want a less disruptive loading indicator here
      try {
          await apiService.delete(`/pets/${petId}/vetnotes/${noteId}`);
          onNoteChange();
      } catch (err: any) {           
          setError(err?.response?.data?.message || err.message || 'Failed to delete note.');
      }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
        // Include time for notes
        return new Date(dateString).toLocaleString(undefined, { 
            year: 'numeric', month: 'short', day: 'numeric', 
            hour: 'numeric', minute: '2-digit' 
        });
    } catch { return 'Invalid Date'; }
  };

  return (
    <div className="space-y-6">
      {/* Add Note Form */}
      <form onSubmit={handleAddNote} className="mb-6">
        <label htmlFor="vet-note-input" className="block text-sm font-medium text-slate-700 mb-1">Add New Note:</label>
        <textarea
          id="vet-note-input"
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm disabled:bg-slate-50"
          placeholder="Enter clinical notes, observations, or treatment adjustments..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          disabled={submitting || loading}
          required
          maxLength={2000}
        />
        {error && (
            <p className="mt-2 text-xs text-red-600">Error: {error}</p>
        )}
        <div className="mt-3 text-right">
            <button 
                type="submit"
                disabled={submitting || loading || !newNote.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
             {submitting ? <LoadingSpinner size="small" color="text-white" /> : 'Add Note'}
            </button>
        </div>
      </form>

      {/* Notes List */}
      <div>
        <h3 className="text-lg font-medium text-slate-600 mb-3 border-t pt-4">Existing Notes:</h3>
        {loading && <LoadingSpinner />}
        {!loading && notes.length === 0 && (
          <p className="text-sm text-slate-500">No veterinarian notes added yet.</p>
        )}
        {!loading && notes.length > 0 && (
          <ul className="divide-y divide-slate-200">
            {notes.map(note => (
              <li key={note._id} className="py-4">
                <div className="flex justify-between items-start">
                    <p className="text-sm text-slate-800 whitespace-pre-wrap flex-1 mr-4">{note.note}</p>
                    <div className="flex-shrink-0 flex items-center space-x-2">
                        <span className="text-xs text-slate-500 whitespace-nowrap">{formatDate(note.createdAt)}</span>
                        <button 
                            onClick={() => handleDeleteNote(note._id)} 
                            title="Delete Note" 
                            className="text-slate-400 hover:text-red-600"
                         >
                            <TrashIcon className="h-4 w-4" />
                         </button>
                    </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default VetNotesSection; 