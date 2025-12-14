# VoiceOwl Transcription App

A production-ready full-stack application for managing audio transcriptions, featuring a layered backend architecture and a modern React frontend.

## Project Structure (Monorepo)

- **`backend/`**: Node.js + Express + TypeScript + MongoDB
- **`frontend/`**: React + TypeScript + Redux Toolkit + Vite + Tailwind CSS

## Architecture Overview

### Backend Architecture
The backend follows a strict **Layered Architecture** to separate concerns and ensure maintainability:
- **Controllers**: Handle HTTP requests/responses, input validation, and delegate business logic.
- **Services**: Contain all business logic (e.g., `transcription.service`, `azure.service`).
- **Models**: Defines Data Access Layer (DAL) schemas and interfaces (Mongoose).
- **Utils/Middleware**: Reusable components for logging, error handling, and retry logic.

**Key Features:**
- **Retry Mechanism**: Exponential backoff implemented for Azure service integration.
- **Centralized Error Handling**: Global error middleware ensures consistent API responses.
- **Safety**: Strict TypeScript typing `strict: true`.

### Frontend Architecture
The frontend is built with scalability in mind using **Redux Toolkit** and **Feature-based** organization:
- **Features**: Logic (Slcices, Thunks, Types) grouped by domain (e.g., `features/transcription`).
- **Components**: Reusable UI elements (`Button`, `InputField`, `Loader`).
- **Pages**: Top-level views (`Home`, `Transcriptions`).
- **Hooks**: Typed custom hooks for Redux state access.

## Scalability & Performance Plan

### MongoDB Strategy (100M+ Records)
1.  **Indexing**: A compound index on time-based queries is essential. We implemented indexing on `createdAt` (`{ createdAt: -1 }`) to optimize the "Recent 30 Days" query.
2.  **Sharding**: For 100M+ records, we would shard the database based on a high-cardinality key (e.g., `hashed(_id)` or time-based buckets) to distribute write load and storage.
3.  **Archiving**: Move records older than 1 year to cold storage (e.g., S3/Data Lake) to keep the working set small.

### Scalability for 10k+ Concurrent Users
1.  **Horizontal Scaling**: Utilize PM2 or Docker/Kubernetes (K8s) to run multiple instances of the Node.js backend behind a Load Balancer (Nginx/AWS ALB).
2.  **Caching**: Implement Redis to cache frequent GET requests (`/transcriptions`) and invalidate on new writes.
3.  **Asynchronous Processing**: Introduce a Message Queue (RabbitMQ/BullMQ) to decouple the ingestion (`POST /transcription`) from the processing. The API would return `202 Accepted` immediately, and workers would process the audio in the background.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or connection string)

### Backend Setup
1.  Navigate to `backend`:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create `.env` file (or use provided defaults):
    ```env
    PORT=4000
    MONGO_URI=mongodb://127.0.0.1:27017/voiceowl
    ```
4.  Run in development mode:
    ```bash
    npm run dev
    ```
5.  Run Tests:
    ```bash
    npm test
    ```

### Frontend Setup
1.  Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` in your browser.

## Assumptions
- **Azure Integration**: Implemented as a stub/mock for this evaluation. It includes the structure and retry logic but does not make actual calls to Azure Cognitive Services.
- **Local DB**: Assumes a local MongoDB instance is reachable.

## Production Improvements
- **Authentication**: JWT middleware is prepared but routes are currently public.
- **Validation**: Add Zod or Joi for stricter runtime payload validation.
- **Logging**: Replace console logger with Winston/Morgan and pipe logs to ELK/Datadog.
