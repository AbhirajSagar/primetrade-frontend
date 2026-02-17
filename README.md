# PrimeTrade Frontend

A task management application built with Next.js and React. 

## 🚀 Features

- **User Authentication**
  - User login and registration
  - Secure session management
  - Protected routes and pages

- **Task Management**
  - Create new tasks
  - View all tasks with detailed information
  - Edit existing tasks
  - Delete tasks
  - Task cards with visual representation

- **User Interface**
  - Styling with Tailwind CSS
  - Icons from Lucide React

## 🛠 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd primetrade-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables** (if needed)
   - Create a `.env.local` file in the root directory
   - Add your API endpoints and configuration

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the application for production
- `npm start` - Start the production server

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   ├── globals.css               # Global styles
│   ├── auth/                     # Authentication routes
│   │   ├── layout.js             # Auth layout
│   │   ├── login/page.js         # Login page
│   │   └── register/page.js      # Registration page
│   └── task/                     # Task management routes
│       ├── create/page.js        # Create task page
│       └── edit/[id]/page.js     # Edit task page
├── components/                    # Reusable UI components
│   ├── Error.js                  # Error display component
│   ├── Loading.js                # Loading state component
│   ├── Modal.js                  # Modal dialog component
│   └── TaskCard.js               # Task card component
├── constants/                     # Application constants
│   └── Endpoints.js              # API endpoint definitions
└── services/                      # API services
    ├── AuthServices.js           # Authentication API calls
    └── TaskServices.js           # Task management API calls

public/                           # Static assets
```

## 🔗 API Integration

The application communicates with a backend API through service files located in `src/services/`:

- **AuthServices.js** - Handles user login, registration, and authentication
- **TaskServices.js** - Manages task CRUD operations
- **Endpoints.js** - Centralized API endpoint configuration