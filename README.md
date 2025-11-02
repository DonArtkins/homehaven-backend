# HomeHaven Backend API

A robust, secure, and scalable backend API built with Node.js, Express, and MongoDB. This API serves as the backbone for the HomeHaven platform, providing authentication, user management, and core business logic.

## 🚀 Features

- **🔐 Authentication & Authorization**

  - JWT-based authentication
  - Role-based access control (User, Admin, Super Admin)
  - Google OAuth 2.0 integration
  - Secure password hashing with bcrypt

- **👥 User Management**

  - User registration and profile management
  - Phone number validation (Kenyan formats)
  - Account activation/deactivation
  - Secure password policies

- **🛡️ Security**

  - Helmet.js for security headers
  - Rate limiting on authentication endpoints
  - Input validation and sanitization
  - CORS configuration
  - Environment variable protection

- **📊 Database**
  - MongoDB with Mongoose ODM
  - Data validation and schemas
  - Automatic phone number normalization
  - Soft delete functionality

## 🏗️ Architecture

```
backend/
├── config/         # Database configuration
├── controllers/    # Route controllers
├── models/         # MongoDB models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── services/       # Business logic
├── scripts/        # Database seeds & utilities
└── server.js       # Application entry point
```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js, Google OAuth
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Validation**: Mongoose schema validation

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v5.0 or higher)
- npm or yarn

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-org/homehaven-backend.git
cd homehaven-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/homehaven

# JWT
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

### 4. Database Setup

```bash
# Start MongoDB service
sudo systemctl start mongod

# Seed initial data (creates admin users)
npm run seed
```

### 5. Start the server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## 🧪 API Testing

The API will be running at `http://localhost:5000`

### Health Check

```bash
curl http://localhost:5000/api/health
```

### Authentication Endpoints

| Method | Endpoint             | Description             | Body                                              |
| ------ | -------------------- | ----------------------- | ------------------------------------------------- |
| POST   | `/api/auth/register` | User registration       | `{name, email, phone, password, confirmPassword}` |
| POST   | `/api/auth/login`    | User login              | `{email, password}`                               |
| GET    | `/api/auth/google`   | Google OAuth initiation | -                                                 |
| GET    | `/api/auth/profile`  | Get user profile        | -                                                 |
| PUT    | `/api/auth/profile`  | Update user profile     | `{name, email, phone}`                            |
| DELETE | `/api/auth/account`  | Delete user account     | -                                                 |

### Example Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "0712345678",
    "password": "securepassword123",
    "confirmPassword": "securepassword123"
  }'
```

## 🔗 Frontend Integration

### Environment Variables

Add to your frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Authentication Flow

1. User registers/login via frontend forms
2. Frontend sends requests to backend API endpoints
3. Backend handles database operations and returns JWT tokens
4. Frontend stores tokens and includes them in subsequent requests

### Protected Requests

```javascript
// Include JWT token in headers
const response = await fetch("/api/auth/profile", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

## 👥 Default Users

After running the seed script, these users are created:

| Role        | Email                    | Password       | Access Level          |
| ----------- | ------------------------ | -------------- | --------------------- |
| Super Admin | superadmin@homehaven.com | SuperAdmin123! | Full system access    |
| Admin       | admin@homehaven.com      | Admin123!      | Administrative access |
| Developer   | dev@homehaven.com        | Dev123!        | Development access    |

## 🔒 Security Features

- **Password Requirements**: Minimum 8 characters
- **Phone Validation**: Supports +254 and 07 Kenyan formats
- **Rate Limiting**: 100 requests per 15 minutes on auth endpoints
- **CORS**: Configured for frontend domain only
- **JWT Expiration**: Configurable token lifespan
- **Input Sanitization**: MongoDB injection prevention

## 🚢 Deployment

### Production Environment Variables

```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_secure_production_jwt_secret
FRONTEND_URL=your_production_frontend_url
```

### Deployment Steps

1. Set up MongoDB Atlas or production MongoDB instance
2. Configure environment variables
3. Build and start the application
4. Set up reverse proxy (nginx recommended)
5. Configure SSL certificates

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**

- Verify MongoDB service is running
- Check connection string in `.env`

**JWT Errors**

- Ensure `JWT_SECRET` is set
- Check token expiration

**CORS Errors**

- Verify `FRONTEND_URL` matches your frontend domain

### Logs

Check application logs for detailed error information.

## 🤝 Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the Apache License 2.0 - see the `LICENSE` file for details.

## 🆘 Support

For support, please contact:

- **Email**: dev@homehaven.com
- **Issues**: [GitHub Issues](https://github.com/your-org/homehaven-backend/issues)

## 🔄 Versioning

We use [Semantic Versioning](https://semver.org/). For the versions available, see the [tags on this repository](https://github.com/your-org/homehaven-backend/tags).
