# OncoTracker

OncoTracker is a Progressive Web Application (PWA) for veterinary oncologists to collect and track symptom data for pets undergoing cancer treatment. It enables pet owners to participate in their pet's care by reporting symptoms through custom surveys.

## Features

- **Veterinarian Dashboard**: Manage patients, create and monitor symptom tracking studies
- **Symptom Surveys**: Veterinarians can create custom symptom tracking surveys
- **Owner Participation**: Pet owners can submit symptom data through unique links
- **Standardized Scales**: Uses RTOG and VCOG-CTCAE toxicity scales
- **Offline Support**: Works without internet connection
- **PWA Support**: Installable on desktop and mobile devices
- **Data Visualization**: Track symptom trends over time
- **Report Generation**: Generate comprehensive reports for medical records

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **PWA Features**: Service Worker, Manifest, Offline Storage

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB

### Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment

### Backend Deployment (Render.com)

1. Commit changes to GitHub
2. Deploy from latest init using the Render.com service dashboard

### Frontend Deployment (Netlify)

```bash
cd client
npm run build
netlify deploy --prod --dir=dist
```

## Project Structure

```
/oncotracker
  /client (React PWA)
    /public (PWA assets)
    /src
      /components (UI components)
      /pages (main application pages)
      /contexts (auth, data contexts)
      /services (API services)
      /utils (helper functions)
      /hooks (custom React hooks)
  /server
    /controllers (route handlers)
    /models (MongoDB schemas)
    /routes (API endpoints)
    /middleware (auth, validation)
    /utils (helper functions)
```

## Usage

1. Register as a veterinarian
2. Add patients to your dashboard
3. Create a symptom tracking study
4. Share the unique link with the pet owner
5. Monitor symptom data as it's submitted
6. Generate reports for medical records

## License

This project is licensed under the MIT License. 