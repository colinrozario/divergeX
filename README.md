# DivergeX - Neurodivergent Assistive Platform

An AI-powered platform designed to support neurodivergent individuals with communication, learning, and planning tools. Built with modern web technologies and a focus on accessibility-first design.

🌐 **Live Demo**: [https://diverge-x-client.vercel.app](https://diverge-x-client.vercel.app)

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
- React 19 with Vite
- TailwindCSS (Modern utility-first styling)
- Zustand (Lightweight state management)
- React Router v6
- Axios (HTTP client)

**Backend:**
- Node.js with Express 5
- Drizzle ORM (Type-safe database queries)
- Neon Database (Serverless PostgreSQL)
- Google Gemini AI (Advanced language processing)
- JWT Authentication
- Helmet & CORS (Security)

**Deployment:**
- Frontend: Vercel
- Backend: Vercel Serverless Functions
- Database: Neon (Serverless PostgreSQL)

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

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

For **production** (using deployed server), edit `client/.env`:
```env
VITE_API_URL=https://diverge-x-server.vercel.app/api
VITE_APP_NAME=DivergeX
```

For **local development**, create `client/.env.local`:
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=DivergeX
```

> **Note**: `.env.local` takes precedence over `.env` and is git-ignored for local development.

4. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Access your account at `/login`
3. **Dashboard**: View all available tools
4. **Customize**: Adjust accessibility settings in `/settings` to your preferences
5. **Explore Tools**:
   - **Communication**: Analyze tone, format messages, practice conversations
   - **Learning**: Simplify complex text, generate visual summaries
   - **Planning**: Manage tasks with energy-level awareness

## Design Philosophy

DivergeX features a modern, clean design inspired by contemporary fintech applications:
- **Soft, rounded corners** (rounded-3xl) for a friendly, approachable feel
- **Neutral color palette** with subtle accents for reduced visual stress
- **Generous spacing** and clear typography for improved readability
- **Minimal animations** with reduced motion support
- **High contrast options** for better visibility

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
├── client/                          # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── communication/      # Communication tool components
│   │   │   ├── learning/           # Learning tool components
│   │   │   ├── planning/           # Planning tool components
│   │   │   ├── layout/             # Header, navigation, etc.
│   │   │   └── shared/             # Reusable UI components
│   │   ├── pages/                  # Page components
│   │   ├── store/                  # Zustand state stores
│   │   ├── services/               # API service layer
│   │   ├── App.jsx                 # Main app component
│   │   └── index.css               # Global styles
│   ├── .env                        # Production environment variables
│   ├── .env.local                  # Local development variables (git-ignored)
│   └── package.json
├── server/                          # Backend API
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.js           # Drizzle database schema
│   │   │   └── index.js            # Database connection
│   │   ├── routes/                 # API route handlers
│   │   ├── services/
│   │   │   └── ai.service.js       # Google Gemini AI integration
│   │   ├── middleware/             # Auth & validation middleware
│   │   └── server.js               # Express server setup
│   ├── .env                        # Server environment variables
│   ├── vercel.json                 # Vercel deployment config
│   └── package.json
└── README.md
```

## Security

- **Password Security**: Bcrypt hashing with salt rounds
- **Authentication**: JWT token-based auth with secure storage
- **Rate Limiting**: Express rate limiter (100 requests per 15 minutes)
- **CORS Protection**: Configured for localhost and production domains
- **Security Headers**: Helmet middleware for HTTP security
- **Input Validation**: Zod schema validation on all endpoints
- **Environment Variables**: Sensitive data stored in .env files (git-ignored)

## Accessibility Compliance

DivergeX follows WCAG 2.1 AA guidelines and neurodiversity-focused design principles:

**Visual Accessibility:**
- High contrast mode option
- Adjustable font sizes (80%-200%)
- Dyslexia-friendly font options (OpenDyslexic)
- Color contrast ratios meeting AA standards
- Multiple theme options (Light, Dark, High Contrast)

**Motor Accessibility:**
- Full keyboard navigation support
- Large, easy-to-click touch targets
- Reduced motion option for animations
- Focus indicators on all interactive elements

**Cognitive Accessibility:**
- Clear, simple language
- Consistent navigation patterns
- Visual hierarchy and spacing
- Energy-aware task planning
- Customizable reading levels

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels and descriptions
- Live regions for dynamic content
- Skip navigation links

## Development Tips

**Running Locally:**
1. Start the backend server: `cd server && npm run dev`
2. Start the frontend: `cd client && npm run dev`
3. Ensure `.env.local` is configured for local API connection

**Common Issues:**
- **CORS errors**: Make sure your local server is running and `.env.local` points to `http://localhost:3000/api`
- **Database errors**: Run `npx drizzle-kit push` to sync schema changes
- **Build errors**: Clear node_modules and reinstall dependencies

**Deployment:**
- Frontend and backend are deployed separately on Vercel
- Environment variables must be configured in Vercel dashboard
- CORS is configured to allow both localhost and production domains

## Contributing

This is a neurodiversity-focused project. Contributions that improve accessibility and user experience are welcome.

**Guidelines:**
- Follow existing code style and patterns
- Test accessibility features thoroughly
- Consider neurodivergent user needs in all changes
- Update documentation for new features

## License

ISC

## Support

For issues or questions, please open an issue on the repository.

## Acknowledgments

Built with consideration for the neurodivergent community. Special thanks to all contributors and users who provide feedback to make DivergeX more accessible and useful.
