import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Pet } from '../../types';
import api from '../../services/api';

// Import our components
import WelcomeSection from '../../components/dashboard/WelcomeSection';
import ResourcesSection from '../../components/dashboard/ResourcesSection';

const OwnerDashboardNew: React.FC = () => {
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

  // Content to render based on loading and error states
  const renderContent = () => {
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center flex-column py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading your pet's information...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-danger my-3 rounded-3 shadow-sm py-3" role="alert">
          {error}
        </div>
      );
    }

    if (pets.length === 0) {
      return (
        <div className="text-center py-5 px-3 bg-white rounded-4 shadow-sm mx-auto" style={{ maxWidth: '700px' }}>
          <img src="/placeholder-pet.svg" alt="No pets" className="mb-3 opacity-75" width="180" height="180" />
          <h4 className="mb-2 fw-semibold">No pets found</h4>
          <p className="mb-4 text-muted mx-auto" style={{ maxWidth: '500px' }}>
            Get started by adding your pet's information. This will help us track their cancer treatment and symptoms effectively.
          </p>
          
          <Link 
            to="/pet-parent/pets/new"
            className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
          >
            Add Your First Pet
          </Link>
        </div>
      );
    }

    return (
      <>
        {/* Pet Cards Section */}
        <div className="mb-5">
          <h4 className="mb-3 fw-bold d-flex align-items-center">
            <span className="bg-primary d-inline-block me-2" style={{ width: '3px', height: '24px', borderRadius: '4px' }}></span>
            Your Pets
          </h4>
          
          <div className="row g-4">
            {/* Render pet cards */}
            {pets.map((pet, index) => (
              <div key={pet._id} className="col-12 col-sm-6 col-md-4 col-xl-3">
                <div 
                  className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden" 
                  style={{ transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {pet.photoUrl && (
                    <img 
                      src={pet.photoUrl} 
                      alt={pet.name} 
                      className="card-img-top object-fit-cover" 
                      height="160"
                      style={{ objectPosition: 'center' }}
                    />
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="card-title fw-bold mb-1">{pet.name}</h5>
                      {pet.treatmentStatus === 'active' && (
                        <span className="badge bg-success rounded-pill px-2 fs-7">Active Treatment</span>
                      )}
                    </div>
                    <p className="card-text text-muted small text-capitalize mb-3">
                      {pet.species} • {pet.breed} • {pet.age} years old
                    </p>
                    <Link 
                      to={`/pet-parent/pets/${pet._id}`} 
                      className="btn btn-primary rounded-pill w-100"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Add pet card */}
            <div className="col-12 col-sm-6 col-md-4 col-xl-3">
              <Link 
                to="/pet-parent/pets/new"
                className="card h-100 border-2 border-dashed rounded-4 bg-white text-center d-flex flex-column align-items-center justify-content-center p-4 text-decoration-none text-dark"
                style={{ 
                  minHeight: '200px', 
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'var(--bs-primary)';
                  const icon = e.currentTarget.querySelector('.add-icon') as HTMLElement;
                  if (icon) {
                    icon.style.backgroundColor = 'var(--bs-primary)';
                    icon.style.color = 'white';
                    icon.style.transform = 'scale(1.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '';
                  const icon = e.currentTarget.querySelector('.add-icon') as HTMLElement;
                  if (icon) {
                    icon.style.backgroundColor = '';
                    icon.style.color = '';
                    icon.style.transform = '';
                  }
                }}
              >
                <div 
                  className="add-icon rounded-circle d-flex align-items-center justify-content-center mb-3 bg-primary bg-opacity-10 text-primary fs-3"
                  style={{ 
                    width: '60px', 
                    height: '60px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  +
                </div>
                <div className="fw-medium">Add another pet</div>
              </Link>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-5">
          <ResourcesSection />
        </div>
      </>
    );
  };

  return (
    <div className="w-100 fade-in">
      <div className="container-fluid py-3 py-md-4 px-3 px-md-4">
        <div className="mb-4 mb-md-5">
          <WelcomeSection userName={user?.firstName || ''} />
        </div>
        
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerDashboardNew; 