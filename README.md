# LegalEase - AI Legal ChatBot

A comprehensive AI-powered legal assistant specializing in Indian law, featuring document analysis with OCR, intelligent chat responses, and modern web interface.

## Features

- **Intelligent Legal Chat**: Natural conversation flow with comprehensive Indian legal knowledge
- **Document Analysis & OCR**: Upload legal documents for instant text extraction and analysis
- **15+ Legal Areas**: Property, criminal, family, civil, consumer law, and more
- **Privacy & Security**: End-to-end encryption with secure document processing
- **Modern UI**: Responsive design with blue gradient theme and professional aesthetics

## Tech Stack

- **Frontend**: React 18 + TypeScript, Tailwind CSS, Radix UI
- **Backend**: Node.js + Express, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **File Processing**: Tesseract.js for OCR, Multer for uploads
- **Build**: Vite for frontend, ESBuild for backend

## Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd legalease-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_database_url
   NODE_ENV=development
   PORT=5000
   ```

4. **Run database migrations**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5000`

## Deployment

### Quick Deploy Options

#### 1. **Replit Deployments** (Recommended)
- Connect your GitHub repository to Replit
- Click "Deploy" in the Replit interface
- Automatic builds and hosting with PostgreSQL database

#### 2. **Vercel**
- Connect GitHub repository to Vercel
- Set build command: `npm run build`
- Set start command: `npm start`
- Add environment variables in Vercel dashboard

#### 3. **Railway**
- Connect GitHub repository to Railway
- Automatic detection of Node.js project
- Add PostgreSQL service
- Set environment variables

#### 4. **Render**
- Connect GitHub repository to Render
- Set build command: `npm run build`
- Set start command: `npm start`
- Add PostgreSQL database

### Environment Variables for Production

```env
DATABASE_URL=your_production_postgresql_url
NODE_ENV=production
PORT=5000
```

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/          # Utilities and configuration
├── server/                # Express backend
│   ├── services/         # Business logic services
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database interface
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
└── dist/                # Production build output
```

## API Endpoints

- `GET /api/chat/welcome` - Get welcome message
- `GET /api/chat/:sessionId/messages` - Get chat messages
- `POST /api/chat/:sessionId/message` - Send chat message
- `POST /api/document/upload` - Upload and analyze document

## Features Overview

### Legal Knowledge Base
- Property registration and documentation
- Criminal law procedures (FIR, bail applications)
- Family law matters (divorce, custody, maintenance)
- Consumer protection and complaints
- Civil law contracts and agreements

### Document Processing
- Support for PNG, JPG, JPEG, PDF, DOC, DOCX
- OCR text extraction from images
- Intelligent document categorization
- Legal area identification
- Key points extraction

### Security Features
- Session-based authentication
- Encrypted file processing
- Secure document storage
- Privacy-compliant data handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Contact support through the application
- Visit our help center

---

Built with ❤️ for the Indian Legal System