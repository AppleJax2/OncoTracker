import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light text-muted py-4 mt-5 border-top border-light w-100">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          {/* Copyright and links */}
          <div className="col-md-7 mb-4 mb-md-0 text-center text-md-start">
            <p className="mb-2">
              &copy; {currentYear} <span className="text-primary fw-medium">Onco</span>Tracker. All Rights Reserved.
            </p>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3">
              <a href="/privacy" className="text-muted text-decoration-none">Privacy Policy</a>
              <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
              <a href="/about" className="text-muted text-decoration-none">About Us</a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="col-md-5 d-flex flex-column align-items-center align-items-md-end">
            <p className="mb-2">Connect with us</p>
            <div className="social-icons">
              <a href="#" className="text-muted me-2">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-muted me-2">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-muted me-2">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 