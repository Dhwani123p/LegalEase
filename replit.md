# AI Legal ChatBot - Replit Guide

## Overview

This is a full-stack AI-powered legal chatbot application designed to provide users with instant access to Indian legal information and assistance in drafting legal documents. The application combines a React frontend with an Express backend, featuring document processing, AI-powered chat responses, and comprehensive legal knowledge base functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom design tokens and gradients
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Style**: RESTful APIs with JSON responses
- **File Processing**: Multer for file uploads with memory storage
- **Development**: Hot module replacement via Vite middleware integration

### Database & Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (configured for deployment)
- **Migrations**: Drizzle Kit for schema management
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Schema**: Structured tables for users, chat messages, legal documents, and knowledge base

## Key Components

### Chat System
- **Real-time Messaging**: Session-based chat with persistent message history
- **Intelligent Legal Engine**: Custom rule-based system for comprehensive Indian legal responses
- **Message Categorization**: Automatic classification into legal categories (property, criminal, family, civil, consumer)
- **Pattern Recognition**: Advanced query pattern matching for detailed procedural guidance
- **Knowledge Base Integration**: Extensive legal FAQ and procedure database

### Document Processing
- **File Upload**: Support for images (PNG, JPG, JPEG) and documents (PDF, DOC, DOCX)
- **OCR Integration**: Tesseract.js for text extraction from images
- **AI Analysis**: OpenAI-powered document summarization and legal area classification
- **File Size Limits**: 10MB maximum file size with validation

### Legal Knowledge Base
- **Categorized Content**: Organized by legal domains with keyword-based search
- **Priority System**: Weighted responses for better accuracy
- **FAQ Integration**: Comprehensive question-answer pairs for common legal queries
- **Search Functionality**: Keyword matching with category filtering

### UI/UX Features
- **Modern Design**: Gradient-based design system with professional legal aesthetics
- **Responsive Layout**: Mobile-first design with adaptive components
- **Component Library**: Comprehensive UI components using Radix primitives
- **Accessibility**: ARIA-compliant components with keyboard navigation support

## Data Flow

### Chat Flow
1. User sends message through chat interface
2. Backend categorizes query and extracts keywords
3. System searches legal knowledge base for relevant information
4. If no match found, OpenAI generates contextual response
5. Response is stored in database and returned to frontend
6. Frontend displays message with appropriate styling and metadata

### Document Processing Flow
1. User uploads document through drag-and-drop interface
2. Backend validates file type and size constraints
3. For images: OCR extraction using Tesseract.js
4. For documents: Direct text extraction (implementation ready)
5. Custom Document Analyzer identifies document type, legal area, and extracts key points
6. Intelligent summarization based on document patterns and legal context
7. Processed document stored with metadata in database
8. Frontend displays processing status and comprehensive analysis results

## External Dependencies

### AI Services
- **Rule-Based Legal Engine**: Custom-built intelligent response system for Indian legal queries
- **Document Analysis Engine**: Comprehensive document type identification and legal area classification
- **Tesseract.js**: Client-side OCR for image text extraction

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL for production deployment
- **Connect-pg-simple**: PostgreSQL session store for Express sessions

### UI & Development
- **Radix UI**: Accessible component primitives
- **Lucide React**: Consistent icon system
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema definition

### Development Tools
- **ESBuild**: Fast bundling for production server builds
- **TSX**: TypeScript execution for development
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles TypeScript server to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Local development with in-memory storage and Vite HMR
- **Production**: Compiled server with PostgreSQL database connection
- **Environment Variables**: Secure API key management for OpenAI and database

### Server Architecture
- **Static Serving**: Production build serves React app from Express
- **API Routes**: RESTful endpoints under `/api` prefix
- **Error Handling**: Comprehensive error middleware with logging
- **Request Logging**: Detailed API request logging for debugging

### Scalability Considerations
- **Database**: PostgreSQL with proper indexing for chat and document queries
- **Storage**: Ready for cloud storage integration for file uploads
- **AI Rate Limiting**: OpenAI API integration with proper error handling
- **Session Management**: Scalable session storage using PostgreSQL