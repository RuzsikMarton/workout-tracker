# 🏋️ Workout Tracker

A modern, full-featured workout tracking application built with Next.js 15, TypeScript, and Prisma. Track your exercises, create custom workouts, monitor your progress, and achieve your fitness goals with an intuitive multilingual interface.

## ✨ Features

### 🎯 Core Functionality

- **Workout Management**: Create, track, and manage workouts with detailed exercise logs
- **Exercise Library**: Comprehensive database of exercises with muscle groups and equipment filtering
- **Set Tracking**: Log reps, weight, and completion status for each exercise set
- **Progress Analytics**: Track total volume, workout duration, and performance metrics
- **Workout Status**: Manage workouts as in-progress, completed, or abandoned

### 🔐 Authentication & Security

- Secure authentication powered by [Better Auth](https://www.better-auth.com/)
- Role-based access control (User/Admin)
- Protected routes and API endpoints
- Email verification support

### 🌍 Multi-Language Support

- Full internationalization (i18n) support
- Available in:
  - 🇬🇧 English
  - 🇭🇺 Hungarian
  - 🇸🇰 Slovak
- Dynamic language switching

### 👨‍💼 Admin Features

- User management dashboard
- Exercise database management
- Role assignment and permissions
- System administration tools

### 🎨 User Experience

- Modern, responsive UI with Tailwind CSS
- Dark mode support
- Mobile-friendly design
- Smooth animations and transitions
- Interactive charts with Recharts

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Charts**: [Recharts](https://recharts.org/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

### Backend

- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Better Auth](https://www.better-auth.com/)
- **API**: Next.js API Routes

### Development Tools

- **Linting**: ESLint
- **Type Checking**: TypeScript

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)
- [PostgreSQL](https://www.postgresql.org/) database

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd workout-tracker
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/workout_tracker"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Optional: Email configuration for verification
# EMAIL_SERVER_HOST="smtp.example.com"
# EMAIL_SERVER_PORT=587
# EMAIL_SERVER_USER="your-email@example.com"
# EMAIL_SERVER_PASSWORD="your-password"
# EMAIL_FROM="noreply@example.com"
```

### 4. Set up the database

```bash
# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate deploy

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
workout-tracker/
├── prisma/              # Database schema and migrations
│   ├── schema.prisma    # Prisma schema definition
│   └── migrations/      # Database migration files
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── [locale]/   # Internationalized routes
│   │   │   ├── admin/      # Admin dashboard
│   │   │   ├── exercises/  # Exercise management
│   │   │   ├── workouts/   # Workout tracking
│   │   │   ├── profile/    # User profile
│   │   │   ├── signin/     # Authentication
│   │   │   └── signup/     # Registration
│   │   └── api/        # API routes
│   ├── components/     # React components
│   │   ├── admin/      # Admin-specific components
│   │   ├── auth/       # Authentication components
│   │   ├── exercises/  # Exercise components
│   │   ├── workouts/   # Workout components
│   │   ├── layout/     # Layout components
│   │   └── ui/         # Reusable UI components
│   ├── lib/            # Utility functions and configurations
│   │   ├── actions/    # Server actions
│   │   ├── data/       # Data fetching utilities
│   │   ├── validations/ # Zod schemas
│   │   └── providers/  # Context providers
│   ├── types/          # TypeScript type definitions
│   └── i18n/           # Internationalization configuration
├── messages/           # Translation files (en, hu, sk)
└── public/             # Static assets
```

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run type-check` - Run TypeScript type checking

## 🗃 Database Schema

The application uses the following main models:

- **User**: User accounts with authentication and profile information
- **Workout**: Workout sessions with status tracking and metrics
- **Exercise**: Exercise library with muscle groups and equipment
- **WorkoutExercise**: Exercises added to specific workouts
- **ExerciseSet**: Individual sets with reps, weight, and completion status
- **Session/Account/Verification**: Authentication related models

## 🔑 Key Features Breakdown

### Workout Creation

1. Create a new workout with a title and description
2. Add exercises from the exercise library
3. Define sets with reps and target weight
4. Track completion status in real-time

### Exercise Management

- Browse exercises by muscle group
- Filter by equipment type
- View exercise details and images
- Add custom exercises (admin)

### Progress Tracking

- Monitor total volume lifted
- Track workout duration
- View workout history
- Analyze performance trends

### User Profiles

- Personal dashboard
- Workout statistics
- Profile customization
- Language preferences

## 🌐 Internationalization

The app supports multiple languages through next-intl. Language files are located in the `messages/` directory. To add a new language:

1. Create a new folder in `messages/` with the language code
2. Add translation files (`common.json`, `exercises.json`, etc.)
3. Update the i18n configuration in `src/i18n/routing.ts`

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository
2. Import your repository on Vercel
3. Configure environment variables
4. Deploy!

### Deploy on Other Platforms

1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Start the production server: `npm run start`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or support, please use the contact form in the application or reach out through the repository.

---

Built with ❤️ using Next.js and modern web technologies.
