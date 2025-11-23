# NestJS Dockerized Starter

This project is a **NestJS** application, fully dockerized for easy development and deployment. It features:

- **User authentication** (register/login) with JWT
- **PostgreSQL** as the main database
- **Redis** integration (for caching, sessions, etc.)
- Modular structure (User, Auth, Redis modules)
- API validation and documentation with Swagger

---

## Features

- **User Module**: Register and login users, password hashing with bcrypt, JWT authentication.
- **Auth Module**: Handles JWT strategies and guards.
- **Redis Module**: Provides Redis-based features (caching, etc.).
- **PostgreSQL**: Used as the main database for user data.
- **Swagger**: API documentation available out-of-the-box.

---

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd nestjs-dockerize
   ```

2. **Build Docker images (no cache):**
   ```bash
   docker compose build --no-cache
   ```

3. **Start the services:**
   ```bash
   docker compose up -d
   ```

4. **Access the API:**
   - The NestJS app runs on [http://localhost:8383](http://localhost:8383)
   - Swagger docs: [http://localhost:8383/api](http://localhost:8383/api)

---

## Project Structure

```
├── src/
│   ├── modules/
│   │   ├── auth/      # Auth logic (JWT, guards, strategies)
│   │   ├── redis/     # Redis integration
│   │   └── user/      # User entity, controller, service
│   ├── dto/           # Data transfer objects
│   └── main.ts        # App entry point
├── Dockerfile         # Docker build instructions
├── docker-compose.yml # Multi-service orchestration
├── package.json       # Dependencies
└── ...
```

---

## Environment Variables

Configure your environment variables in a `.env` file (see `.env.example` if available). Typical variables:

```
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=youruser
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=yourdb
REDIS_HOST=redis
REDIS_PORT=6379
JWT_SECRET=your_jwt_secret
```

---

## Useful Commands

- **Stop services:**
  ```bash
  docker compose down
  ```
- **View logs:**
  ```bash
  docker compose logs -f
  ```
- **Rebuild after code changes:**
  ```bash
  docker compose build --no-cache && docker compose up -d
  ```

---

## License

MIT

