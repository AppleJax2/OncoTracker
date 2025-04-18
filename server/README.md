# OncoTracker API Server

Backend API for the OncoTracker application, a veterinary oncology symptom tracking system.

## Technologies

- Node.js
- Express
- MongoDB
- JWT Authentication
- RESTful API design

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables (.env file):
   ```
   MONGODB_URI=mongodb+srv://your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. Run development server:
   ```
   npm run dev
   ```

4. Run production server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new veterinarian
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/auth/me` - Get current user profile (authenticated)

### Patients

- `GET /api/patients` - Get all patients for current user
- `GET /api/patients/:id` - Get a single patient
- `POST /api/patients` - Create a new patient
- `PUT /api/patients/:id` - Update a patient
- `DELETE /api/patients/:id` - Delete a patient
- `GET /api/patients/:id/studies` - Get all studies for a patient
- `PUT /api/patients/:id/archive` - Archive a patient

### Studies

- `GET /api/studies` - Get all studies for current user
- `GET /api/studies/active` - Get active studies for current user
- `GET /api/studies/scales` - Get all available toxicity scales
- `GET /api/studies/access/:accessToken` - Get study data for owner view (public)
- `GET /api/studies/:id` - Get a single study
- `POST /api/studies` - Create a new study
- `PUT /api/studies/:id` - Update a study
- `PUT /api/studies/:id/complete` - Complete a study
- `PUT /api/studies/:id/terminate` - Terminate a study early
- `GET /api/studies/:id/submissions` - Get all submissions for a study

### Submissions

- `POST /api/submissions` - Create a new submission (public with token)
- `GET /api/submissions/study/:accessToken` - Get owner submissions (public with token)
- `POST /api/submissions/sync` - Bulk sync offline submissions
- `GET /api/submissions/aggregate/:studyId` - Get aggregate data for a study
- `GET /api/submissions/:id` - Get a single submission
- `PUT /api/submissions/:id` - Update a submission
- `DELETE /api/submissions/:id` - Delete a submission

## Data Models

### User (Veterinarian)
```javascript
{
  name: String,
  email: String,
  password: String,
  practice: {
    name: String,
    address: String,
    phone: String
  },
  role: String,
  createdAt: Date
}
```

### Patient
```javascript
{
  name: String,
  owner: {
    name: String,
    email: String,
    phone: String
  },
  species: String,
  breed: String,
  dateOfBirth: Date,
  diagnosis: String,
  treatmentType: String,
  notes: String,
  createdBy: ObjectId,
  createdAt: Date,
  isArchived: Boolean
}
```

### Study
```javascript
{
  title: String,
  patient: ObjectId,
  veterinarian: ObjectId,
  treatmentType: String,
  description: String,
  startDate: Date,
  endDate: Date,
  duration: Number,
  submissionFrequency: String,
  symptoms: Array,
  customQuestions: Array,
  status: String,
  accessToken: String,
  createdAt: Date
}
```

### Submission
```javascript
{
  study: ObjectId,
  timestamp: Date,
  symptoms: Array,
  customResponses: Array,
  additionalNotes: String,
  submittedBy: Object,
  deviceInfo: Object,
  location: Object,
  offlineSubmitted: Boolean,
  synced: Boolean
}
``` 