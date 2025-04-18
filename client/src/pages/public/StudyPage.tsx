import { useState, useEffect, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudyByAccessToken, getOwnerSubmissions } from '../../services/studies';
import { createSubmission, storeOfflineSubmission } from '../../services/submissions';
import { isOnline, getDeviceInfo, getUserLocation } from '../../utils/network';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon,
  WifiIcon,
  ArchiveBoxIcon,
  ChevronUpIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

const StudyPage = () => {
  const { accessToken } = useParams<{ accessToken: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Study data
  const [study, setStudy] = useState<any>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);
  
  // Form state
  const [symptomRatings, setSymptomRatings] = useState<Record<string, number>>({});
  const [symptomNotes, setSymptomNotes] = useState<Record<string, string>>({});
  const [customResponses, setCustomResponses] = useState<Record<string, any>>({});
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [ownerName, setOwnerName] = useState(
    localStorage.getItem('ownerName') || ''
  );

  // Function to load study data
  const loadStudy = async () => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const studyData = await getStudyByAccessToken(accessToken);
      
      // Initialize symptom ratings to 0
      const initialRatings: Record<string, number> = {};
      const initialNotes: Record<string, string> = {};
      
      studyData.symptoms.forEach((symptom: any) => {
        initialRatings[symptom.name] = 0;
        initialNotes[symptom.name] = '';
      });
      
      // Initialize custom responses
      const initialCustomResponses: Record<string, any> = {};
      
      studyData.customQuestions.forEach((question: any) => {
        if (question.responseType === 'boolean') {
          initialCustomResponses[question.question] = false;
        } else if (question.responseType === 'number') {
          initialCustomResponses[question.question] = 0;
        } else if (question.responseType === 'scale') {
          initialCustomResponses[question.question] = 0;
        } else {
          initialCustomResponses[question.question] = '';
        }
      });
      
      setStudy(studyData);
      setSymptomRatings(initialRatings);
      setSymptomNotes(initialNotes);
      setCustomResponses(initialCustomResponses);
      
      // Load previous submissions
      const submissionsData = await getOwnerSubmissions(accessToken);
      setSubmissions(submissionsData);
      
    } catch (error) {
      console.error('Error loading study:', error);
      setError('Unable to load study information. This link may be invalid or the study has ended.');
    } finally {
      setLoading(false);
    }
  };

  // Load study data on component mount
  useEffect(() => {
    loadStudy();
  }, [accessToken]);

  // Save owner name to local storage when it changes
  useEffect(() => {
    if (ownerName) {
      localStorage.setItem('ownerName', ownerName);
    }
  }, [ownerName]);

  // Handle symptom rating change
  const handleRatingChange = (symptomName: string, rating: number) => {
    setSymptomRatings(prev => ({
      ...prev,
      [symptomName]: rating
    }));
  };

  // Handle symptom notes change
  const handleNotesChange = (symptomName: string, notes: string) => {
    setSymptomNotes(prev => ({
      ...prev,
      [symptomName]: notes
    }));
  };

  // Handle custom response change
  const handleCustomResponseChange = (
    question: string,
    value: any,
    responseType: string
  ) => {
    let processedValue = value;
    
    // Convert string to number for number type
    if (responseType === 'number') {
      processedValue = value === '' ? 0 : Number(value);
    }
    
    setCustomResponses(prev => ({
      ...prev,
      [question]: processedValue
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!study || !accessToken) return;
    
    setSubmitting(true);
    setError(null);
    
    try {
      // Format symptoms data
      const symptoms = Object.keys(symptomRatings).map(name => ({
        symptomId: name,
        name,
        rating: symptomRatings[name],
        notes: symptomNotes[name]
      }));
      
      // Format custom responses
      const formattedCustomResponses = Object.keys(customResponses).map(question => ({
        questionId: question,
        question,
        response: customResponses[question]
      }));
      
      // Create submission data
      const submissionData = {
        studyId: study.studyId,
        accessToken,
        symptoms,
        customResponses: formattedCustomResponses,
        additionalNotes,
        submittedBy: {
          name: ownerName,
          role: 'owner'
        },
        timestamp: new Date().toISOString(),
        offlineSubmitted: !isOnline()
      };
      
      // Try to add device info and location
      try {
        submissionData.deviceInfo = getDeviceInfo();
        
        // Only try to get location if online
        if (isOnline()) {
          try {
            submissionData.location = await getUserLocation();
          } catch (locationError) {
            // Ignore location errors, it's optional
            console.info('Location unavailable:', locationError);
          }
        }
      } catch (infoError) {
        // Ignore device info errors, it's optional
        console.info('Device info unavailable:', infoError);
      }
      
      if (isOnline()) {
        // Submit directly if online
        await createSubmission(submissionData);
      } else {
        // Store locally if offline
        storeOfflineSubmission(submissionData);
      }
      
      // Reset form
      Object.keys(symptomRatings).forEach(name => {
        symptomRatings[name] = 0;
        symptomNotes[name] = '';
      });
      
      Object.keys(customResponses).forEach(question => {
        const questionData = study.customQuestions.find(
          (q: any) => q.question === question
        );
        
        if (questionData.responseType === 'boolean') {
          customResponses[question] = false;
        } else if (questionData.responseType === 'number' || questionData.responseType === 'scale') {
          customResponses[question] = 0;
        } else {
          customResponses[question] = '';
        }
      });
      
      setAdditionalNotes('');
      setSubmitSuccess(true);
      
      // Reload submissions
      if (isOnline()) {
        const newSubmissions = await getOwnerSubmissions(accessToken);
        setSubmissions(newSubmissions);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error submitting data:', error);
      setError('Failed to submit data. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading study..." />
      </div>
    );
  }

  // Render error state
  if (error || !study) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <ExclamationTriangleIcon className="h-12 w-12" />
          </div>
          <h2 className="text-center text-xl font-bold text-red-700 mb-2">
            Study Not Available
          </h2>
          <p className="text-center text-gray-600 mb-6">
            {error || 'The requested study could not be found or has ended.'}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render study form
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">
            {study.title}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Symptom tracking for {study.patient.name}
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Network status indicator */}
          <div className={`flex items-center mb-4 p-2 rounded-md ${isOnline() ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <WifiIcon
              className={`h-5 w-5 mr-2 ${isOnline() ? 'text-green-500' : 'text-yellow-500'}`}
            />
            <p className={`text-sm ${isOnline() ? 'text-green-700' : 'text-yellow-700'}`}>
              {isOnline() 
                ? 'You are online. Submissions will be sent immediately.'
                : 'You are offline. Submissions will be saved and sent when you reconnect.'}
            </p>
          </div>

          {/* Success message */}
          {submitSuccess && (
            <div className="flex items-center mb-4 p-3 rounded-md bg-green-50 text-green-700">
              <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
              <p>Submission successfully recorded!</p>
            </div>
          )}

          {/* Submission form */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md mb-6">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Report Symptoms
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Please rate the following symptoms to help track treatment progress.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              {/* Owner name input */}
              <div className="mb-6">
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="ownerName"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Enter your name"
                />
              </div>
              
              {/* Symptoms */}
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-3">Symptoms</h4>
                <div className="space-y-6">
                  {study.symptoms.map((symptom: any) => {
                    const scales = study.symptomScales[symptom.name] || [];
                    return (
                      <div key={symptom.name} className="border rounded-md p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {symptom.name}
                        </label>
                        
                        {/* Rating scale */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[...Array(symptom.maxValue + 1)].map((_, i) => {
                            const scale = scales.find((s: any) => s.grade === i);
                            return (
                              <div key={i} className="flex flex-col items-center">
                                <button
                                  type="button"
                                  onClick={() => handleRatingChange(symptom.name, i)}
                                  className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                                    symptomRatings[symptom.name] === i
                                      ? 'bg-primary-100 border-primary-500 text-primary-700'
                                      : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  {i}
                                </button>
                                {scale && (
                                  <span className="text-xs text-gray-500 mt-1 max-w-[80px] text-center">
                                    {scale.ownerDescription ? scale.ownerDescription.substring(0, 30) + (scale.ownerDescription.length > 30 ? '...' : '') : ''}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Optional notes */}
                        <div>
                          <label htmlFor={`notes-${symptom.name}`} className="block text-xs text-gray-500 mb-1">
                            Additional Notes (Optional)
                          </label>
                          <textarea
                            id={`notes-${symptom.name}`}
                            value={symptomNotes[symptom.name] || ''}
                            onChange={(e) => handleNotesChange(symptom.name, e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            rows={2}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Custom questions */}
              {study.customQuestions && study.customQuestions.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-base font-medium text-gray-900 mb-3">Additional Questions</h4>
                  <div className="space-y-4">
                    {study.customQuestions.map((question: any) => (
                      <div key={question.question} className="border rounded-md p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {question.question}
                          {question.required && <span className="text-red-500">*</span>}
                        </label>
                        
                        {/* Render appropriate input based on response type */}
                        {question.responseType === 'text' && (
                          <textarea
                            value={customResponses[question.question] || ''}
                            onChange={(e) => handleCustomResponseChange(
                              question.question,
                              e.target.value,
                              question.responseType
                            )}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            rows={3}
                            required={question.required}
                          />
                        )}
                        
                        {question.responseType === 'number' && (
                          <input
                            type="number"
                            value={customResponses[question.question] || 0}
                            onChange={(e) => handleCustomResponseChange(
                              question.question,
                              e.target.value,
                              question.responseType
                            )}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            required={question.required}
                          />
                        )}
                        
                        {question.responseType === 'boolean' && (
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`question-${question.question}`}
                              checked={customResponses[question.question] || false}
                              onChange={(e) => handleCustomResponseChange(
                                question.question,
                                e.target.checked,
                                question.responseType
                              )}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`question-${question.question}`} className="ml-2 block text-sm text-gray-700">
                              Yes
                            </label>
                          </div>
                        )}
                        
                        {question.responseType === 'scale' && (
                          <div className="flex flex-wrap gap-2">
                            {[...Array(5)].map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                onClick={() => handleCustomResponseChange(
                                  question.question,
                                  i + 1,
                                  question.responseType
                                )}
                                className={`h-10 w-10 rounded-full flex items-center justify-center border ${
                                  customResponses[question.question] === i + 1
                                    ? 'bg-primary-100 border-primary-500 text-primary-700'
                                    : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Additional notes */}
              <div className="mb-6">
                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                  Any Other Observations (Optional)
                </label>
                <textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  rows={4}
                />
              </div>
              
              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary"
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner size="sm" color="white" text="" />
                      <span className="ml-2">Submitting...</span>
                    </>
                  ) : (
                    'Submit Symptoms'
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Previous submissions */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center cursor-pointer" 
              onClick={() => setShowSubmissions(!showSubmissions)}
            >
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Previous Submissions
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  View your submission history for this study.
                </p>
              </div>
              {showSubmissions ? (
                <ChevronUpIcon className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-gray-400" />
              )}
            </div>
            
            {showSubmissions && (
              <div className="px-4 py-5 sm:p-6">
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-gray-900">
                            {new Date(submission.timestamp).toLocaleString()}
                          </h4>
                          {submission.offlineSubmitted && !submission.synced && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Pending Sync
                            </span>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {submission.symptoms.map((symptom: any) => (
                            <div key={symptom.symptomId} className="flex items-start">
                              <span className="text-sm font-medium text-gray-500 min-w-[120px]">
                                {symptom.name}:
                              </span>
                              <span className="text-sm text-gray-900 ml-2">
                                {symptom.rating}
                                {symptom.notes && (
                                  <span className="text-gray-500 ml-2">({symptom.notes})</span>
                                )}
                              </span>
                            </div>
                          ))}
                          
                          {submission.additionalNotes && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <span className="text-sm font-medium text-gray-500">
                                Additional Notes:
                              </span>
                              <p className="mt-1 text-sm text-gray-900">
                                {submission.additionalNotes}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <ArchiveBoxIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2">No submissions yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} OncoTracker - Veterinary Oncology Symptom Tracking System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StudyPage; 