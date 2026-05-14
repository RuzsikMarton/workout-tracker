// ============================================
// NAVIGATION
// ============================================
export const navLinks = [
  { name: "home", href: "/" },
  { name: "workouts", href: "/workouts" },
  { name: "exercises", href: "/exercises" },
  { name: "contact", href: "/contact" },
];

// ============================================
// EXERCISE DATA
// ============================================
export const MUSCLE_GROUPS = [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "abs",
  "legs",
];

export const EQUIPMENT_OPTIONS = [
  "bodyweight",
  "dumbbell",
  "barbell",
  "bench",
  "kettlebell",
  "machine",
  "pull-up-bar",
  "cable",
];

// ============================================
// WORKOUT STATUS
// ============================================
export const WORKOUT_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ABANDONED: "ABANDONED",
} as const;

// ============================================
// USER ROLES
// ============================================
export const USER_ROLES = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

// ============================================
// PAGINATION
// ============================================
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

// ============================================
// VALIDATION LIMITS
// ============================================
export const VALIDATION_LIMITS = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
} as const;

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: "/",
  WORKOUTS: "/workouts",
  ACTIVE_WORKOUT: "/workouts/active",
  EXERCISES: "/exercises",
  CONTACT: "/contact",
  PROFILE: "/profile",
  SIGN_IN: "/signin",
  SIGN_UP: "/signup",
  ADMIN: {
    USERS: "/admin/users",
    EXERCISES: "/admin/exercises",
    NEW_EXERCISE: "/admin/exercises/new",
  },
} as const;

// ============================================
// API ENDPOINTS
// ============================================
export const API_ENDPOINTS = {
  EXERCISES: "/api/exercises",
  WORKOUTS: "/api/workouts",
} as const;
