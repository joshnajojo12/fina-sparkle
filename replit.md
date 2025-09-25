# FinanceAI - Personal Finance Management Platform

## Overview

FinanceAI is a comprehensive personal finance management platform built with React and TypeScript. The application provides AI-powered financial insights, expense tracking, savings goal management, and fraud detection capabilities. It features a dual-mode interface designed to serve both students and working professionals with tailored experiences and functionality.

The platform emphasizes gamification for student users while providing sophisticated financial tools for professionals. Key features include expense categorization, savings goal tracking, bill management, budget analysis, and intelligent SMS-based fraud detection.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router for client-side navigation
- **State Management**: React Query (TanStack Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **Charts**: Recharts for data visualization

### Design System
- **Theme**: Dark-first design with glassmorphism aesthetics
- **Color Scheme**: Blue-to-cyan gradient primary colors with semantic color tokens
- **Typography**: Custom font hierarchy with gradient text effects
- **Components**: Consistent component library with hover effects and animations
- **Responsive**: Mobile-first responsive design patterns

### Application Architecture
- **Role-Based Interface**: Dual-mode system (Student vs Professional) with persistent role selection
- **Component Structure**: 
  - Layout components (Navbar, navigation)
  - Dashboard components (stats cards, charts, quick actions)
  - Student-specific components (gamified UI, badges, simplified features)
  - Shared UI components from shadcn/ui library
- **Data Flow**: Component-based state management with React hooks
- **Routing**: Protected routes based on user role selection

### Development Environment
- **Package Management**: npm with lock file for dependency consistency
- **Code Quality**: ESLint with TypeScript-specific rules
- **Build Process**: Vite with React SWC plugin for fast compilation
- **Development Server**: Hot reload enabled with host configuration for remote access

## External Dependencies

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives for building components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Utility for conditional className composition
- **lucide-react**: Icon library for consistent iconography

### Charts and Visualization
- **recharts**: React charting library for financial data visualization
- **embla-carousel-react**: Carousel component for interactive content display

### Form Management
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Form validation resolvers

### Development Tools
- **@vitejs/plugin-react-swc**: Fast React compilation
- **typescript**: Type checking and development experience
- **eslint**: Code linting and quality enforcement
- **postcss**: CSS processing with autoprefixer

### Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **@supabase/supabase-js**: Backend integration (configured but may use different database)

### Utilities
- **date-fns**: Date manipulation and formatting
- **cmdk**: Command menu implementation
- **input-otp**: OTP input component
- **next-themes**: Theme switching capability

### Potential Integrations
The application is structured to support integration with various financial services, SMS processing for fraud detection, and real-time data updates through the configured query client system.