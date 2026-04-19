# InterviewAI Frontend

A modern React application built with Vite that provides an AI-powered interview platform. This frontend application offers user authentication and interactive interview experiences.

## Features

- **User Authentication**: Secure login and registration system with form validation
- **Interview Management**: Create and participate in AI-powered interviews
- **Protected Routes**: Route protection based on authentication status
- **Responsive Design**: Mobile-friendly interface with SCSS styling
- **Form Validation**: Client-side validation using React Hook Form and Zod
- **API Integration**: RESTful API communication with Axios

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **Styling**: SCSS/Sass
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Linting**: ESLint
- **Language**: JavaScript (ES6+)

## Project Structure

```
src/
├── app/
│   ├── App.jsx              # Main application component
│   ├── App.css              # Application styles
│   └── app.routes.jsx       # Route configuration
├── features/
│   ├── auth/                # Authentication module
│   │   ├── authContext.jsx  # Authentication context
│   │   ├── components/      # Auth-specific components
│   │   ├── hooks/           # Custom auth hooks
│   │   ├── pages/           # Login/Register pages
│   │   ├── services/        # API services
│   │   ├── styles/          # Auth-specific styles
│   │   └── validators/      # Form validators
│   └── interview/           # Interview module
│       ├── interviewContext.jsx  # Interview context
│       ├── hooks/           # Custom interview hooks
│       ├── pages/           # Interview pages
│       ├── services/        # Interview API services
│       ├── styles/          # Interview-specific styles
│       └── validators/      # Interview validators
├── index.css                # Global styles
└── main.jsx                 # Application entry point
```

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd InterviewAI/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and configure your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Usage

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

3. **Register/Login**
   - Create a new account or login with existing credentials
   - Access protected interview features

4. **Take Interviews**
   - Navigate to the interview section
   - Participate in AI-powered interviews
   - View results and feedback

## Development

### Code Style
- Follow ESLint configuration for consistent code quality
- Use SCSS modules for component-specific styling
- Implement proper error handling and loading states

### Adding New Features
1. Create feature modules under `src/features/`
2. Follow the established structure (components, hooks, services, etc.)
3. Add proper validation using Zod schemas
4. Update routing in `app.routes.jsx` if needed

## API Integration

The application communicates with a backend API for:
- User authentication (login/register)
- Interview data management
- User session management

Configure the API base URL in your environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is private and proprietary.
