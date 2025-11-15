# DivergeX - Neurodivergent Assistive Platform

An AI-powered platform designed to support neurodivergent individuals with communication, learning, and planning tools.

> **🚀 New to DivergeX?** Start with [START_HERE.md](START_HERE.md) for a 5-minute setup guide!
> 
> **📚 Need documentation?** Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) to find what you need.

## Features

### 🗣️ Communication Tools
- **Tone Analyzer**: Understand emotional tone and social context in messages
- **Message Formatter**: Improve message clarity and appropriateness
- **Conversation Simulator**: Practice social interactions in safe scenarios

### 📚 Learning Assistance
- **Text Simplifier**: Adapt complex content to your reading level
- **Visual Summaries**: Generate mind maps and structured outlines
- **Key Points Extraction**: Identify main concepts quickly

### 📅 Planning & Organization
- **Task Manager**: Organize tasks with energy-level awareness
- **Timeline Builder**: Visual scheduling with reminders
- **Executive Function Tools**: Support for working memory and task initiation

### ♿ Accessibility Features
- WCAG 2.1 AA compliant
- Multiple theme options (Light, Dark, High Contrast)
- Dyslexia-friendly fonts
- Adjustable text size (80%-200%)
- Reduced motion support
- Screen reader optimizations

## Tech Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS
- Zustand (State Management)
- React Router
- Axios

**Backend:**
- Node.js
- Express
- Drizzle ORM
- Neon Database (PostgreSQL)
- Google Gemini AI
- JWT Authentication

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Neon Database account
- Google Gemini API key

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
Edit `server/.env` with your credentials:
```env
DATABASE_URL=your_neon_database_url
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
PORT=3000
CORS_ORIGIN=http://localhost:5173
```

4. Run database migrations:
```bash
npx drizzle-kit push:pg
```

5. Start the server:
```bash
npm run dev
```

Server will run on http://localhost:3000

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies (already done):
```bash
npm install
```

3. Configure environment variables:
Edit `client/.env`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=DivergeX
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Access your account at `/login`
3. **Dashboard**: View all available tools
4. **Customize**: Adjust accessibility settings to your preferences
5. **Explore**: Try communication, learning, and planning tools

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Communication
- `POST /api/communication/analyze-tone` - Analyze message tone
- `POST /api/communication/format-message` - Format message
- `POST /api/communication/simulate-conversation` - Practice conversation

### Learning
- `POST /api/learning/process-text` - Simplify text
- `POST /api/learning/generate-visual-summary` - Create visual summary
- `GET /api/learning/learning-history` - Get history

### Planning
- `GET /api/planning/tasks` - Get all tasks
- `POST /api/planning/tasks` - Create task
- `PUT /api/planning/tasks/:id` - Update task
- `DELETE /api/planning/tasks/:id` - Delete task

### Accessibility
- `GET /api/accessibility/settings` - Get settings
- `PUT /api/accessibility/settings` - Update settings

## Project Structure

```
divergex/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                # Backend API
│   ├── src/
│   │   ├── db/           # Database schema
│   │   ├── routes/       # API routes
│   │   ├── services/     # AI services
│   │   ├── middleware/   # Auth middleware
│   │   └── server.js     # Express server
│   └── package.json
└── README.md
```

## Security

- Passwords hashed with bcrypt
- JWT token authentication
- Rate limiting on API endpoints
- CORS protection
- Helmet security headers
- Input validation with Zod

## Accessibility Compliance

DivergeX follows WCAG 2.1 AA guidelines:
- Semantic HTML
- ARIA labels and descriptions
- Keyboard navigation
- Focus management
- Color contrast ratios
- Screen reader support
- Reduced motion support

## Contributing

This is a neurodiversity-focused project. Contributions that improve accessibility and user experience are welcome.

## License

ISC

## Support

For issues or questions, please open an issue on the repository.
