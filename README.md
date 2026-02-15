<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS Authentication & Authorization - Educational Project

A comprehensive educational project demonstrating NestJS core features, authentication, authorization, and best practices.

## Project Overview

This project serves as a learning resource for NestJS framework, covering essential concepts from basic CRUD operations to advanced security implementations. It demonstrates a complete authentication system with role-based access control (RBAC), database integration, file uploads, and API documentation.

## Learning Objectives

- Understand NestJS architecture and modules
- Implement JWT-based authentication
- Build role-based access control (RBAC)
- Work with TypeORM and PostgreSQL
- Create custom decorators, guards, and interceptors
- Validate requests with DTOs
- Document APIs with Swagger
- Implement security best practices

## NestJS Features Demonstrated

### 1. **Modules & Dependency Injection**

- Modular architecture with `AuthModule`, `UsersModule`
- Circular dependency resolution using `forwardRef()`
- Service providers and dependency injection
- Module exports for shared functionality

### 2. **Authentication & Security**

#### JWT Authentication

- Token generation and validation
- Bearer token extraction from headers
- Payload signing with user information
- Token verification in guards

#### Password Security

- bcryptjs for password hashing (salt rounds: 12)
- Secure password comparison
- Minimum password length validation

#### Rate Limiting

```typescript
@Throttle({ default: { limit: 3, ttl: 60000 } })
```

- Prevents brute-force attacks on login endpoint
- Configurable limits per endpoint

#### Security Headers

- Helmet middleware for secure HTTP headers
- Protection against common vulnerabilities

### 3. **Authorization (RBAC)**

#### Role-Based Access Control

- User roles: `USER`, `ADMIN`
- Custom `@Roles()` decorator for role requirements
- `RolesGuard` for role verification
- Protected routes based on user roles

#### Role Enum

```typescript
enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}
```

### 4. **Guards**

#### AuthGuard

- Validates JWT tokens from Authorization header
- Extracts user payload and attaches to request
- Throws `UnauthorizedException` for invalid tokens

#### RolesGuard

- Checks user roles against required roles
- Uses Reflector to read metadata
- Throws `ForbiddenException` for insufficient permissions

### 5. **Custom Decorators**

#### @Roles Decorator

```typescript
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
```

- Marks routes with required roles
- Used with RolesGuard for authorization
- Supports multiple roles per route

### 6. **TypeORM Integration**

#### Entity Definition

- `@Entity()`, `@Column()`, `@PrimaryGeneratedColumn()`
- Enum columns for role types
- Timestamps: `@CreateDateColumn()`, `@UpdateDateColumn()`
- Soft deletes: `@DeleteDateColumn()`

#### Repository Pattern

- `InjectRepository()` for database access
- CRUD operations with TypeORM Repository
- Query builders and filters
- Pagination support

#### Features Used

- Unique constraints
- Default values
- Select options for sensitive fields (password)
- Soft delete functionality

### 7. **Data Validation**

#### DTOs (Data Transfer Objects)

- `LoginDto`, `RegisterDto`, `CreateUserDto`, `UpdateUserDto`

#### class-validator Decorators

```typescript
@IsNotEmpty()
@IsEmail()
@IsString()
@MinLength(6)
@IsOptional()
@IsEnum(UserRole)
```

- Automatic request validation
- Custom validation messages
- Type safety and transformation

### 8. **Interceptors**

#### LoggerInterceptor

- Request/response logging
- Performance monitoring
- Custom interceptor implementation
- Applied at controller or method level

### 9. **File Upload**

#### Multer Integration

- `FileInterceptor` for single file uploads
- Disk storage configuration
- File size limits (5MB)
- File type filtering (images and videos)
- Custom filename generation
- MIME type validation

### 10. **API Documentation (Swagger)**

#### Decorators Used

```typescript
@ApiProperty()
@ApiBearerAuth()
@ApiConsumes('multipart/form-data')
@ApiBody()
@ApiOkResponse()
```

- Automatic API documentation generation
- Schema definitions for requests/responses
- Bearer token authentication UI
- File upload documentation

### 11. **HTTP Features**

#### Controllers

- RESTful routing
- Route parameters and query parameters
- HTTP status codes with `@HttpCode()`
- Request body binding
- File upload handling

#### HTTP Methods

```typescript
@Get(), @Post(), @Patch(), @Delete()
```

#### Parameter Decorators

```typescript
@Body(), @Param(), @Query(), @Request(), @UploadedFile()
```

#### Pipes

- `ParseIntPipe` for query parameter transformation
- Optional parameter handling

### 12. **Configuration Management**

- `@nestjs/config` for environment variables
- Type-safe configuration
- JWT secret and expiration configuration

### 13. **Error Handling**

- Built-in exception filters
- Custom error messages
- HTTP exception classes:
  - `UnauthorizedException`
  - `ForbiddenException`
  - `BadRequestException`

## Project Structure

```bash
src/
├── auth/                    # Authentication module
│   ├── auth.controller.ts   # Login, register, me endpoints
│   ├── auth.service.ts      # Auth business logic
│   ├── auth.module.ts       # Auth module configuration
│   ├── dto/                 # Data Transfer Objects
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   └── guards/              # Security guards
│       ├── auth.guard.ts    # JWT authentication guard
│       └── roles.guard.ts   # Role-based authorization guard
├── users/                   # Users module
│   ├── users.controller.ts  # User CRUD endpoints
│   ├── users.service.ts     # User business logic
│   ├── users.module.ts      # User module configuration
│   ├── dto/                 # DTOs for user operations
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   └── entities/            # Database entities
│       └── user.entity.ts   # User entity definition
├── decorators/              # Custom decorators
│   └── roles.decorator.ts   # RBAC decorator
├── interceptors/            # Custom interceptors
│   └── logger.interceptor.ts
├── types/                   # Type definitions
│   └── role.enum.ts         # User role enum
└── main.ts                  # Application entry point
```

## API Endpoints

### Authentication Endpoints

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login (rate-limited: 3 attempts/minute)
- `GET /auth/me` - Get current user (protected)

### User Management Endpoints (Admin Only)

- `POST /users` - Create user
- `GET /users` - List users (with pagination & search)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Soft delete user
- `POST /users/media` - Upload media file

## Security Features

1. **JWT Tokens**: Stateless authentication
2. **Password Hashing**: bcryptjs with salt rounds
3. **Rate Limiting**: Protects against brute-force attacks
4. **Helmet**: Security headers
5. **RBAC**: Role-based access control
6. **Input Validation**: class-validator
7. **File Upload Restrictions**: Size and type limits
8. **Soft Deletes**: Data retention

## Technologies & Dependencies

### Core

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **Express** - HTTP server

### Database

- **TypeORM** - ORM for TypeScript
- **PostgreSQL** - Relational database

### Authentication

- **@nestjs/jwt** - JWT implementation
- **bcryptjs** - Password hashing

### Validation

- **class-validator** - Decorator-based validation
- **class-transformer** - Object transformation

### Security

- **helmet** - Security headers
- **@nestjs/throttler** - Rate limiting

### Documentation

- **@nestjs/swagger** - OpenAPI/Swagger

### File Upload

- **multer** - Multipart form-data handling

## Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# - Database connection (PostgreSQL)
# - JWT_SECRET
```

## Running the Application

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod

# Type checking
npm run tc
```

## Key Learning Points

### 1. Module Organization

- Separate concerns into feature modules
- Use `exports` to share providers between modules
- Handle circular dependencies properly

### 2. Guards vs Interceptors

- **Guards**: Determine if request should be handled
- **Interceptors**: Transform request/response data

### 3. Decorator Composition

```typescript
@UseGuards(AuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
```

- Chain multiple guards
- Combine with custom decorators

### 4. TypeORM Best Practices

- Use entities for database models
- Implement soft deletes for data retention
- Exclude sensitive fields from default selects
- Use repositories for data access

### 5. DTO Pattern

- Separate DTOs for different operations
- Use validation decorators
- Type safety throughout the application

### 6. Security Best Practices

- Never store plain text passwords
- Implement rate limiting on sensitive endpoints
- Validate all user inputs
- Use guards for authentication and authorization
- Set appropriate HTTP security headers
