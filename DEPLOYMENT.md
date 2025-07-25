# LegalEase Deployment Guide

This guide covers multiple deployment options for the LegalEase AI Legal ChatBot.

## 🚀 Quick Deployment Options

### 1. Replit Deployments (Recommended)

**Best for: Instant deployment with zero configuration**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/legalease-chatbot.git
   git push -u origin main
   ```

2. **Deploy on Replit:**
   - Go to [Replit](https://replit.com)
   - Click "Import from GitHub"
   - Enter your repository URL
   - Click "Deploy" in the Replit interface
   - Automatic PostgreSQL database and environment setup

### 2. Vercel Deployment

**Best for: Frontend-focused projects with serverless functions**

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Add Environment Variables in Vercel Dashboard:**
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: production

### 3. Railway Deployment

**Best for: Full-stack applications with databases**

1. **Connect GitHub to Railway:**
   - Visit [Railway](https://railway.app)
   - Connect your GitHub repository
   - Select your repository

2. **Add PostgreSQL Service:**
   - Click "Add Service" → "Database" → "PostgreSQL"
   - Copy the connection string

3. **Set Environment Variables:**
   - `DATABASE_URL`: Railway PostgreSQL connection string
   - `NODE_ENV`: production

### 4. Render Deployment

**Best for: Simple deployment with automatic builds**

1. **Connect GitHub to Render:**
   - Visit [Render](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configuration:**
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** 18

3. **Add PostgreSQL Database:**
   - Create new PostgreSQL service on Render
   - Copy connection string to environment variables

### 5. Heroku Deployment

1. **Install Heroku CLI and login:**
   ```bash
   heroku login
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## 🐳 Docker Deployment

### Local Docker Setup

1. **Build the Docker image:**
   ```bash
   docker build -t legalease-chatbot .
   ```

2. **Run with Docker Compose:**
   ```yaml
   # docker-compose.yml
   version: '3.8'
   services:
     app:
       build: .
       ports:
         - "5000:5000"
       environment:
         - DATABASE_URL=postgresql://postgres:password@db:5432/legalease
         - NODE_ENV=production
       depends_on:
         - db
     
     db:
       image: postgres:15
       environment:
         - POSTGRES_DB=legalease
         - POSTGRES_USER=postgres
         - POSTGRES_PASSWORD=password
       volumes:
         - postgres_data:/var/lib/postgresql/data
   
   volumes:
     postgres_data:
   ```

3. **Start services:**
   ```bash
   docker-compose up -d
   ```

### Cloud Docker Deployment

#### Digital Ocean App Platform
1. Push Docker image to registry
2. Create new app on Digital Ocean
3. Connect container registry
4. Add managed PostgreSQL database

#### AWS ECS/Fargate
1. Push to ECR (Elastic Container Registry)
2. Create ECS task definition
3. Set up RDS PostgreSQL instance
4. Configure load balancer

## 🗄️ Database Setup

### PostgreSQL Setup Options

#### Option 1: Managed Database Services
- **Neon**: Free PostgreSQL with generous limits
- **Railway**: Integrated with deployment
- **Render**: PostgreSQL addon
- **AWS RDS**: Enterprise-grade managed database

#### Option 2: Self-hosted PostgreSQL
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Create database
sudo -u postgres createdb legalease_db
sudo -u postgres createuser --interactive
```

### Database Migration
```bash
# Run database migrations after deployment
npm run db:push
```

## 🔧 Environment Variables

### Required Environment Variables
```env
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Application
NODE_ENV=production
PORT=5000

# Optional
SESSION_SECRET=your-session-secret-key
```

### Setting Environment Variables

#### Vercel
```bash
vercel env add DATABASE_URL
vercel env add NODE_ENV
```

#### Railway
- Set in Railway dashboard under Variables tab

#### Render
- Set in Render dashboard under Environment tab

#### Heroku
```bash
heroku config:set DATABASE_URL=your_database_url
heroku config:set NODE_ENV=production
```

## 🔍 Monitoring & Health Checks

### Health Check Endpoint
The application includes a health check endpoint at `/health`:

```json
{
  "status": "ok",
  "timestamp": "2024-01-25T10:30:00.000Z",
  "uptime": 3600,
  "environment": "production"
}
```

### Monitoring Services
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance**: New Relic, DataDog

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues
- Verify DATABASE_URL format
- Check firewall settings
- Ensure database is accessible from deployment platform

#### Memory Issues
- Increase memory allocation in deployment platform
- Optimize large dependencies
- Use production build (`NODE_ENV=production`)

### Performance Optimization

1. **Enable compression:**
   ```javascript
   app.use(compression());
   ```

2. **Static file caching:**
   ```javascript
   app.use(express.static('dist/public', { maxAge: '1y' }));
   ```

3. **Database connection pooling:**
   Already configured with Drizzle ORM

## 📊 Scaling Considerations

### Horizontal Scaling
- Use load balancer (nginx, AWS ALB)
- Stateless session storage (Redis)
- Database read replicas

### Performance Monitoring
- Monitor response times
- Track database query performance
- Set up alerts for high CPU/memory usage

## 🔒 Security Checklist

- ✅ Environment variables secured
- ✅ Database connections encrypted
- ✅ HTTPS enabled
- ✅ Rate limiting implemented
- ✅ File upload validation
- ✅ CORS configured properly

## 📝 Post-Deployment

1. **Test all features:**
   - Chat functionality
   - Document upload and OCR
   - All navigation links

2. **Monitor logs:**
   - Check for errors
   - Monitor performance metrics

3. **Backup strategy:**
   - Database backups
   - Application code in version control

---

**Need help?** Check the troubleshooting section or create an issue on GitHub.