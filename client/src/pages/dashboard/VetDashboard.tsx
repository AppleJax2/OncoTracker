// Vet Dashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pet } from '../../types';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VetDashboard.css';

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
        // Fetch patients and pending request count concurrently
        const [patientsResponse, requestsResponse] = await Promise.all([
          api.get('/api/patients'),
          api.get('/api/link-requests/pending') 
        ]);

        // Process patients
        if (patientsResponse.data && patientsResponse.data.status === 'success') {
          setPatients(patientsResponse.data.data?.patients || patientsResponse.data.patients || patientsResponse.data.data || []); 
        } else {
          throw new Error(patientsResponse.data?.message || 'Failed to fetch patient list');
        }

        // Process pending requests count
        if (requestsResponse.data && requestsResponse.data.status === 'success') {
          // Assuming the API returns the count like { status: 'success', count: 3 } 
          // or { status: 'success', data: { count: 3 } }
          setPendingRequests(requestsResponse.data.count ?? requestsResponse.data.data?.count ?? 0);
        } else {
          // Don't throw an error, just log it, as the dashboard can still function partially
          console.warn('Could not fetch pending link request count:', requestsResponse.data?.message || 'Unknown error');
          setPendingRequests(0);
        }

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
    <div className="container py-5">
      {/* Welcome Section */}
      <div className="row mb-5 animate__animated animate__fadeIn">
        <div className="col-12">
          <div className="card shadow-sm border-0 rounded-4 bg-primary bg-opacity-10">
            <div className="card-body p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-md-8 mb-3 mb-md-0">
                  <h1 className="display-6 fw-bold mb-2">
                    Welcome, Dr. {user?.lastName || 'Veterinarian'}
                  </h1>
                  <p className="lead text-muted">
                    Monitor your patients' cancer treatments, review symptom reports, and provide your expertise all in one centralized dashboard.
                  </p>
                </div>
                <div className="col-md-4 text-center text-md-end">
                  <Link
                    to="/vet/link-requests"
                    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                  >
                    <i className="bi bi-people me-2"></i>
                    View Link Requests
                    {pendingRequests > 0 && (
                      <span className="badge bg-white text-primary ms-2 rounded-pill">{pendingRequests}</span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="row g-4 mb-5 animate__animated animate__fadeIn" style={{ animationDelay: '0.1s' }}>
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 stat-card">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-3 me-3">
                  <i className="bi bi-heart text-primary fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small fw-medium">Total Patients</p>
                  <h3 className="fs-2 fw-bold mb-0">{patients.length}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 stat-card">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="bg-info bg-opacity-10 p-3 rounded-3 me-3">
                  <i className="bi bi-clipboard-check text-info fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small fw-medium">Active Treatments</p>
                  <h3 className="fs-2 fw-bold mb-0">
                    {patients.filter(p => p.treatmentType).length}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4 stat-card">
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="bg-warning bg-opacity-10 p-3 rounded-3 me-3">
                  <i className="bi bi-bell text-warning fs-4"></i>
                </div>
                <div>
                  <p className="text-muted small fw-medium">Needs Attention</p>
                  <h3 className="fs-2 fw-bold mb-0">
                    {/* Placeholder for pets that need attention */}
                    {Math.min(3, Math.floor(patients.length / 3))}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-5 animate__animated animate__fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="card-header bg-white p-4 border-bottom">
          <div className="row align-items-center">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <h2 className="fs-4 fw-bold mb-0">Your Patients</h2>
            </div>
            
            {/* Search input */}
            <div className="col-sm-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-0"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5 animate__animated animate__fadeIn">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mt-2">Loading your patients...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger m-4 rounded-3 animate__animated animate__fadeIn" role="alert">
            <div className="d-flex">
              <div className="flex-shrink-0">
                <i className="bi bi-exclamation-circle text-danger me-2"></i>
              </div>
              <div>
                <h5 className="alert-heading fs-6 fw-semibold">There was an error loading your patients</h5>
                <p className="mb-0">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && filteredPatients.length === 0 && (
          <div className="text-center py-5 animate__animated animate__fadeIn">
            {searchTerm ? (
              <>
                <p className="fs-5 fw-medium text-dark mb-2">No patients match your search</p>
                <p className="text-muted mb-3">Try adjusting your search or view all patients</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="btn btn-outline-secondary rounded-pill px-4"
                >
                  Clear Search
                </button>
              </>
            ) : (
              <>
                <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
                  <i className="bi bi-heart text-primary fs-4"></i>
                </div>
                <h4 className="fs-5 fw-medium mb-2">No patients linked</h4>
                <p className="text-muted mb-0 mx-auto" style={{ maxWidth: '500px' }}>
                  Pet owners can link their pets to you via the app. You'll receive notifications when new link requests arrive.
                </p>
              </>
            )}
          </div>
        )}

        {!loading && !error && filteredPatients.length > 0 && (
          <ul className="list-group list-group-flush">
            {filteredPatients.map((patient, index) => (
              <li key={patient._id} className="list-group-item p-0 animate__animated animate__fadeInUp" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
                <Link to={`/vet/patients/${patient._id}`} className="text-decoration-none">
                  <div className="p-4 d-flex align-items-center hover-bg-light patient-item">
                    <div className="d-flex flex-grow-1 align-items-center">
                      <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-3">
                        <i className="bi bi-heart text-warning"></i>
                      </div>
                      <div>
                        <h5 className="text-primary mb-1">{patient.name}</h5>
                        <div className="text-muted small">
                          <span className="text-capitalize">{patient.species} - {patient.breed}</span>
                          <span className="mx-2">•</span>
                          <span>Age: {patient.age || 'N/A'}</span>
                          {patient.treatmentType && (
                            <>
                              <span className="mx-2">•</span>
                              <span className="text-capitalize">{patient.treatmentType} treatment</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="ms-auto d-flex">
                      {/* Show alert indicator if patient needs attention */}
                      {patient._id.charAt(0) === 'a' && ( // Just a random condition for demo
                        <span className="badge bg-warning text-dark me-2 d-flex align-items-center px-3">
                          Needs review
                        </span>
                      )}
                      <i className="bi bi-chevron-right text-muted"></i>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Quick Resources Section */}
      <div className="row g-4 mb-4 animate__animated animate__fadeIn" style={{ animationDelay: '0.3s' }}>
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm rounded-4 resource-card">
            <div className="card-body p-4">
              <h4 className="fs-5 fw-semibold mb-3">Recent Activity</h4>
              <p className="text-muted small">View your recent patients and activity.</p>
              <button className="btn btn-link text-primary p-0 text-decoration-none fw-medium">
                View All Activity <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card h-100 border-0 shadow-sm rounded-4 bg-primary bg-opacity-10 resource-card">
            <div className="card-body p-4">
              <h4 className="fs-5 fw-semibold mb-3 text-primary">Clinical Resources</h4>
              <p className="text-primary text-opacity-75 small">Access clinical guidelines, research, and treatment protocols.</p>
              <button className="btn btn-link text-primary p-0 text-decoration-none fw-medium">
                View Resources <i className="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetDashboard; 