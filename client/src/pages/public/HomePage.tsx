// Modern responsive HomePage for OncoTracker
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css';

// PWA install button component
import PWAInstallButton from '../../components/common/PWAInstallButton';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Initialize Bootstrap JS components
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
        <div className="container px-5">
          <Link className="navbar-brand fw-bold" to="/">OncoTracker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="bi-list"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto me-4 my-3 my-lg-0">
              <li className="nav-item"><a className="nav-link me-lg-3" href="#features">Features</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#download">About</a></li>
              <li className="nav-item"><a className="nav-link me-lg-3" href="#testimonials">Testimonials</a></li>
            </ul>
            <Link to="/signup" className="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0">
              <span className="d-flex align-items-center">
                <span className="small">Sign Up</span>
              </span>
            </Link>
            <Link to="/login" className="btn btn-outline-primary ms-2 rounded-pill px-3 mb-2 mb-lg-0">
              <span className="d-flex align-items-center">
                <span className="small">Log In</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mashead header */}
      <header className="masthead">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6">
              <div className="mb-5 mb-lg-0 text-center text-lg-start">
                <h1 className="display-1 lh-1 mb-3">Navigate Your Pet's Cancer Journey with Confidence</h1>
                <p className="lead fw-normal text-muted mb-5">Managing cancer care can feel overwhelming. OncoTracker simplifies symptom tracking, streamlines vet communication, and empowers you to focus on your pet's comfort and quality of life.</p>
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <Link to="/signup" className="btn btn-primary rounded-pill px-4 py-3 mb-3 mb-lg-0 me-lg-3">
                    <span className="d-flex align-items-center">
                      <span>Get Started Free</span>
                    </span>
                  </Link>
                  <Link to="/login" className="btn btn-outline-dark rounded-pill px-4 py-3">
                    <span className="d-flex align-items-center">
                      <span>Sign In</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="masthead-device-mockup">
                <div className="device-wrapper">
                  <div className="device" data-device="iPhoneX" data-orientation="portrait" data-color="black">
                    <div className="screen bg-black">
                      <img src="/images/app-screenshot.jpg" alt="Pet health tracking screenshot" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Trusted by section */}
      <section className="bg-light py-5">
        <div className="container px-5">
          <div className="text-center">
            <p className="fw-normal text-muted mb-4">Trusted by pet owners and veterinarians across the country</p>
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <span className="text-uppercase fw-bold text-muted px-4 py-2">PetCare Alliance</span>
              <span className="text-uppercase fw-bold text-muted px-4 py-2">VetMed Association</span>
              <span className="text-uppercase fw-bold text-muted px-4 py-2">PetWell Clinics</span>
              <span className="text-uppercase fw-bold text-muted px-4 py-2">Animal Health Network</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="features-section py-5" id="features">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bolder">Powerful Tools for Pet Parents</h2>
              <p className="lead fw-normal text-muted">Everything you need to manage care effectively and collaborate with your vet</p>
            </div>
          </div>
          <div className="row gx-5">
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-clipboard-pulse feature-icon mb-3"></i>
                <h3 className="fw-bold">Daily Symptom Tracking</h3>
                <p className="text-muted mb-0">Log and monitor your pet's symptoms with our easy-to-use tracking system.</p>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-graph-up feature-icon mb-3"></i>
                <h3 className="fw-bold">Progress Charts</h3>
                <p className="text-muted mb-0">Visualize your pet's health journey with comprehensive charts and analytics.</p>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-calendar-check feature-icon mb-3"></i>
                <h3 className="fw-bold">Treatment Reminders</h3>
                <p className="text-muted mb-0">Never miss a medication or appointment with our smart reminder system.</p>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-share feature-icon mb-3"></i>
                <h3 className="fw-bold">Vet Communication</h3>
                <p className="text-muted mb-0">Share reports directly with your veterinarian for better coordinated care.</p>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-database-check feature-icon mb-3"></i>
                <h3 className="fw-bold">Custom Health Logs</h3>
                <p className="text-muted mb-0">Customize tracking parameters based on your pet's specific condition.</p>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="text-center">
                <i className="bi-phone feature-icon mb-3"></i>
                <h3 className="fw-bold">Mobile Friendly</h3>
                <p className="text-muted mb-0">Access your pet's health information anytime, anywhere on any device.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us section */}
      <section className="benefits-section py-5">
        <div className="container px-5">
          <div className="row gx-5 align-items-center">
            <div className="col-lg-6 order-lg-1">
              <div className="p-5">
                <img className="img-fluid rounded-4" src="/images/pet-owner.jpg" alt="Pet owner with dog" />
              </div>
            </div>
            <div className="col-lg-6 order-lg-0">
              <div className="p-5">
                <h2 className="display-4 fw-bold">Why Choose OncoTracker?</h2>
                <div className="d-flex mb-4">
                  <div className="feature-icon-small me-3">
                    <i className="bi-heart"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Enhanced Quality of Life</h5>
                    <p className="text-muted mb-0">Monitor trends and adjust care plans proactively to maximize your pet's comfort and well-being.</p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="feature-icon-small me-3">
                    <i className="bi-people"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Improved Vet Collaboration</h5>
                    <p className="text-muted mb-0">Provide your veterinarian with clear, concise data for more informed decision-making.</p>
                  </div>
                </div>
                <div className="d-flex mb-4">
                  <div className="feature-icon-small me-3">
                    <i className="bi-person-check"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Reduced Caregiver Stress</h5>
                    <p className="text-muted mb-0">Stay organized and feel more in control with reminders and centralized health records.</p>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="feature-icon-small me-3">
                    <i className="bi-lightbulb"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold">Empowered Pet Advocacy</h5>
                    <p className="text-muted mb-0">Gain insights into your pet's condition, enabling better communication and advocacy for their needs.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="how-it-works-section py-5 bg-light">
        <div className="container px-5">
          <div className="text-center mb-5">
            <h2 className="fw-bolder">Simple Steps to Better Care</h2>
            <p className="lead fw-normal text-muted mb-0">Getting started with OncoTracker is quick and easy</p>
          </div>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
              <div className="text-center">
                <div className="step-circle mb-3 mx-auto">1</div>
                <h3 className="fw-bold">Sign Up</h3>
                <p className="text-muted mb-0">Create your free account and add your pet's profile.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
              <div className="text-center">
                <div className="step-circle mb-3 mx-auto">2</div>
                <h3 className="fw-bold">Track Daily</h3>
                <p className="text-muted mb-0">Log symptoms, medications, and activities easily.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="text-center">
                <div className="step-circle mb-3 mx-auto">3</div>
                <h3 className="fw-bold">Share Insights</h3>
                <p className="text-muted mb-0">Generate reports and share them with your vet.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section py-5" id="testimonials">
        <div className="container px-5">
          <h2 className="text-center fw-bolder mb-5">Hear From Our Community</h2>
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="testimonial-text mb-4 text-muted fst-italic">
                    "OncoTracker has been invaluable in monitoring my dog's health. Sharing updates with our vet has never been easier."
                  </div>
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle me-3" src="https://randomuser.me/api/portraits/women/1.jpg" alt="Jane D." width="40" height="40" />
                    <div>
                      <div className="fw-bold">Jane D.</div>
                      <div className="text-muted small">Pet Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="testimonial-text mb-4 text-muted fst-italic">
                    "As a vet, I can now provide better care by having access to daily symptom tracking. The app makes communication with pet parents seamless."
                  </div>
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle me-3" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Dr. Mark S." width="40" height="40" />
                    <div>
                      <div className="fw-bold">Dr. Mark S.</div>
                      <div className="text-muted small">Veterinarian</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow border-0">
                <div className="card-body p-4">
                  <div className="testimonial-text mb-4 text-muted fst-italic">
                    "The medication reminder feature has been a lifesaver. I never miss giving my cat her treatments on time now."
                  </div>
                  <div className="d-flex align-items-center">
                    <img className="rounded-circle me-3" src="https://randomuser.me/api/portraits/women/2.jpg" alt="Sarah T." width="40" height="40" />
                    <div>
                      <div className="fw-bold">Sarah T.</div>
                      <div className="text-muted small">Pet Owner</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section py-5">
        <div className="cta-content">
          <div className="container px-5">
            <h2 className="text-white display-4 fw-bolder">Ready to Improve Your Pet's Care Journey?</h2>
            <p className="text-white lead fw-light mb-5">Join the OncoTracker community today and start making a difference in your pet's health management.</p>
            <Link className="btn btn-light py-3 px-4 rounded-pill me-3" to="/signup">Sign Up Now - It's Free!</Link>
            <Link className="btn btn-outline-light py-3 px-4 rounded-pill" to="/login">Sign In</Link>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="contact-section py-5 bg-light">
        <div className="container px-5">
          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <div className="text-center mb-5">
                <h2 className="fw-bolder">Get in Touch</h2>
                <p className="lead fw-normal text-muted">Have questions about OncoTracker? We're here to help.</p>
              </div>
              <form>
                <div className="form-floating mb-3">
                  <input className="form-control" id="name" type="text" placeholder="Enter your name..." />
                  <label htmlFor="name">Full name</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="email" type="email" placeholder="name@example.com" />
                  <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" />
                  <label htmlFor="phone">Phone number</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea className="form-control" id="message" placeholder="Enter your message here..." style={{ height: '10rem' }}></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                <div className="d-grid"><button className="btn btn-primary btn-lg" type="submit">Submit</button></div>
              </form>
            </div>
          </div>
          <div className="row gx-5 row-cols-2 row-cols-lg-4 py-5 justify-content-center">
            <div className="col">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3 mb-3">
                <i className="bi-envelope"></i>
              </div>
              <div className="h5">Email</div>
              <p className="text-muted mb-0">support@oncotracker.com</p>
            </div>
            <div className="col">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3 mb-3">
                <i className="bi-telephone"></i>
              </div>
              <div className="h5">Phone</div>
              <p className="text-muted mb-0">(555) 123-4567</p>
            </div>
            <div className="col">
              <div className="feature-icon-small d-inline-flex align-items-center justify-content-center text-primary bg-gradient fs-4 rounded-3 mb-3">
                <i className="bi-clock"></i>
              </div>
              <div className="h5">Support Hours</div>
              <p className="text-muted mb-0">Monday - Friday: 9AM - 5PM EST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark py-5">
        <div className="container px-5">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <h4 className="text-white">OncoTracker</h4>
              <p className="text-white-50">Empowering pet owners and veterinarians in the journey of cancer care.</p>
              <div className="social-icons">
                <a className="me-2 text-decoration-none text-white-50" href="#"><i className="bi-facebook fs-5"></i></a>
                <a className="me-2 text-decoration-none text-white-50" href="#"><i className="bi-twitter fs-5"></i></a>
                <a className="me-2 text-decoration-none text-white-50" href="#"><i className="bi-instagram fs-5"></i></a>
                <a className="text-decoration-none text-white-50" href="#"><i className="bi-linkedin fs-5"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-sm-6 mb-5 mb-lg-0">
              <h5 className="text-white mb-3">Product</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="text-white-50 text-decoration-none" href="#features">Features</a></li>
                <li className="mb-2"><a className="text-white-50 text-decoration-none" href="#pricing">Pricing</a></li>
                <li><a className="text-white-50 text-decoration-none" href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-sm-6 mb-5 mb-lg-0">
              <h5 className="text-white mb-3">Company</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><a className="text-white-50 text-decoration-none" href="#about">About Us</a></li>
                <li className="mb-2"><a className="text-white-50 text-decoration-none" href="#blog">Blog</a></li>
                <li><a className="text-white-50 text-decoration-none" href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="col-lg-4">
              <h5 className="text-white mb-3">Subscribe to our newsletter</h5>
              <p className="text-white-50 mb-0">Get the latest news and updates about pet cancer care</p>
              <div className="input-group mb-3 mt-3">
                <input className="form-control" type="text" placeholder="Your email" aria-label="Your email" aria-describedby="button-newsletter" />
                <button className="btn btn-primary" id="button-newsletter" type="button"><i className="bi-send"></i></button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center text-white-50 small">
              &copy; {new Date().getFullYear()} OncoTracker. All rights reserved.
              <span className="mx-2">|</span>
              <a className="text-white-50 text-decoration-none" href="#privacy">Privacy Policy</a>
              <span className="mx-2">|</span>
              <a className="text-white-50 text-decoration-none" href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* PWA Install Button */}
      <PWAInstallButton />
    </>
  );
};

export default HomePage; 