// Placeholder OwnerDashboard Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Pet } from '../../types';
import api from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { PlusIcon, HeartIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './OwnerDashboard.css';

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
        const response = await api.get('/api/pets');
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

  // Animation variants for sections/cards
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Stagger animation
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  const cardHoverTap = {
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.98 },
  };

   const buttonHoverTap = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

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
                    Welcome back, {user?.firstName || 'Pet Parent'}
                  </h1>
                  <p className="lead text-muted">
                    Track your pet's cancer treatment progress, monitor symptoms, and share reports with your veterinarian all in one place.
                  </p>
                </div>
                <div className="col-md-4 text-center text-md-end">
                  <Link to="/owner/pets/new" className="btn btn-primary px-4 py-2 rounded-pill shadow-sm">
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Pet
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {loading && (
        <div className="text-center py-5 animate__animated animate__fadeIn">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Loading your pets...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger animate__animated animate__fadeIn" role="alert">
          <div className="d-flex">
            <div className="flex-shrink-0">
              <i className="bi bi-exclamation-circle text-danger me-2"></i>
            </div>
            <div>
              <h5 className="alert-heading fs-6 fw-semibold">There was an error loading your pets</h5>
              <p className="mb-0">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && pets.length === 0 && (
        <div className="text-center py-5 bg-white rounded-4 shadow-sm animate__animated animate__fadeIn">
          <div className="bg-primary bg-opacity-10 rounded-circle p-3 d-inline-flex mb-3">
            <i className="bi bi-heart text-primary fs-4"></i>
          </div>
          <h3 className="mt-4 fs-4 fw-medium text-dark">No pets found</h3>
          <p className="mt-2 text-muted mx-auto" style={{ maxWidth: '500px' }}>
            Get started by adding your pet's information. This will help us track their cancer treatment and symptoms.
          </p>
          <Link to="/owner/pets/new" className="btn btn-primary px-4 py-2 rounded-pill mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Add Pet
          </Link>
        </div>
      )}

      {!loading && !error && pets.length > 0 && (
        <div className="animate__animated animate__fadeIn">
          <h2 className="fw-bold mb-4">Your Pets</h2>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 mb-5">
            {pets.map((pet, index) => (
              <div key={pet._id} className="col animate__animated animate__fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                <Link to={`/owner/pets/${pet._id}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm rounded-4 pet-card">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-warning bg-opacity-10 p-2 rounded-circle me-3">
                          <i className="bi bi-heart text-warning"></i>
                        </div>
                        <h3 className="fs-5 fw-semibold mb-0 text-dark">{pet.name || 'Unnamed Pet'}</h3>
                      </div>
                      <div className="small text-muted mb-3">
                        <div className="mb-2">
                          <span className="fw-medium text-dark me-2">Type:</span>
                          <span className="text-capitalize">{pet.species || 'N/A'} - {pet.breed || 'N/A'}</span>
                        </div>
                        <div className="mb-2">
                          <span className="fw-medium text-dark me-2">Age:</span>
                          <span>{pet.age || 'N/A'}</span>
                        </div>
                        <div>
                          <span className="fw-medium text-dark me-2">Treatment:</span>
                          <span className="text-capitalize">{pet.treatmentType || 'Not specified'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-light p-3 border-top d-flex justify-content-end align-items-center">
                      <span className="small fw-medium text-primary">
                        View Details <i className="bi bi-arrow-right ms-1"></i>
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            <div className="col animate__animated animate__fadeInUp" style={{ animationDelay: `${pets.length * 0.1}s` }}>
              <Link to="/owner/pets/new" className="text-decoration-none">
                <div className="card h-100 border-0 border-dashed shadow-hover rounded-4 add-pet-card d-flex flex-column align-items-center justify-content-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                    <i className="bi bi-plus-lg text-primary fs-4"></i>
                  </div>
                  <span className="fw-medium text-dark">Add another pet</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Quick Resources Section */}
      {!loading && !error && pets.length > 0 && (
        <div className="mt-5 animate__animated animate__fadeIn">
          <h2 className="fw-bold mb-4">Helpful Resources</h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 bg-info bg-opacity-10 resource-card">
                <div className="card-body p-4">
                  <h3 className="fs-5 fw-semibold text-info mb-3">Symptom Tracking Guide</h3>
                  <p className="text-dark mb-4">Learn how to effectively track and report your pet's symptoms to help your veterinarian provide the best care.</p>
                  <button className="btn btn-link text-info p-0 text-decoration-none fw-medium">
                    Read Guide <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 border-0 shadow-sm rounded-4 bg-warning bg-opacity-10 resource-card">
                <div className="card-body p-4">
                  <h3 className="fs-5 fw-semibold text-warning mb-3">Support for Pet Parents</h3>
                  <p className="text-dark mb-4">Find resources and support groups to help you navigate your pet's cancer journey.</p>
                  <button className="btn btn-link text-warning p-0 text-decoration-none fw-medium">
                    Find Support <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard; 