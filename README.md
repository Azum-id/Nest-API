# Bilibili TV Anime API

A NestJS-based API for fetching anime data from Bilibili TV.

## 📝 Description

This API serves as a backend service for retrieving anime information from Bilibili TV, with features including:

- **Anime Timeline**: Fetch the latest anime release schedule
- **Image Proxy**: Securely proxy images from Bilibili servers
- **Rate Limiting**: Protect against abuse with built-in rate limiting
- **API Documentation**: Interactive Swagger documentation

## 🔧 Technologies

- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Swagger](https://swagger.io/) - API documentation
- [Helmet](https://helmetjs.github.io/) - Security middleware
- [Class Validator](https://github.com/typestack/class-validator) - Input validation
- [Axios](https://axios-http.com/) - HTTP client

## ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/Azum-id/Nest-API.git

# Navigate to the project directory
cd bilibili-anime-api

# Install dependencies
npm install
```

## 🚀 Running the App

```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔌 API Endpoints

### Root

- `GET /` - API information and documentation
- `GET /health` - API health check
- `GET /api-docs` - Interactive API documentation (Swagger UI)

### Anime

- `GET /api/anime/timeline` - Get anime timeline data
  - Query Parameters:
    - `locale` (optional): Language locale (default: `id_ID`)

### Proxy

- `GET /api/proxy/image` - Proxy images from Bilibili servers
  - Query Parameters:
    - `url` (required): Image URL to proxy (must be from `pic.bstarstatic.com`)

## 📋 Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
```

## 🛡️ Security Features

- CORS protection
- Helmet security headers
- Rate limiting (100 requests per 15 minutes)
- Input validation
- Request timeout (30 seconds)

## 🏗️ Project Structure

```
src/
├── main.ts                      # Entry point
├── app.module.ts                # Root module
├── app.controller.ts            # Root controller
├── anime/                       # Anime module
│   ├── anime.module.ts
│   ├── anime.controller.ts
│   ├── anime.service.ts
│   └── dto/
│       └── anime-timeline.dto.ts
├── proxy/                       # Proxy module
│   ├── proxy.module.ts
│   ├── proxy.controller.ts
│   ├── proxy.service.ts
│   └── dto/
│       └── proxy-image.dto.ts
└── common/                      # Shared resources
    ├── interfaces/
    │   └── api-info.interface.ts
    ├── filters/
    │   └── http-exception.filter.ts
    └── interceptors/
        └── timeout.interceptor.ts
```

## 🚨 Limitations

- Only supports proxying images from `pic.bstarstatic.com`
- Rate limited to prevent abuse
- Currently only supports timeline data from Bilibili TV

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request