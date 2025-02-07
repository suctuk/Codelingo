# Codelingo

# Code Learning Platform

An interactive platform for learning programming languages through gamification and social features.

## Features

- 🎮 Interactive learning with gamification
- 👥 Social features and friend quests
- 💎 Virtual currency and rewards system
- 📱 Progressive Web App support
- 🎯 Personalized learning paths
- 🤖 AI-powered tutoring (Premium feature)
- 🌟 Achievement system
- 💬 Real-time messaging

## Tech Stack

### Frontend
- React
- Tailwind CSS
- Socket.IO Client
- React Router
- Redux Toolkit

### Backend
- Node.js
- Express
- MySQL
- Redis
- Socket.IO
- JWT Authentication

### Infrastructure
- Docker
- GitHub Actions
- AWS/GCP/Azure (deployment)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- Redis
- Docker (optional)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/code-learning-platform.git
cd code-learning-platform
```

2. Install dependencies:
```bash
npm run install:all
```

3. Set up environment variables:
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

4. Set up the database:
```bash
mysql -u root -p < server/scripts/db-setup.sql
```

5. Start the development servers:
```bash
npm run dev
```

### Docker Development

1. Build and run the containers:
```bash
docker-compose up --build
```

## Project Structure

```
code-learning-platform/
├── client/          # React frontend
├── server/          # Node.js backend
├── docker/          # Docker configuration
└── docs/            # Documentation
```

## API Documentation

API documentation is available in the [docs/api](docs/api) directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Your Name (@yourusername)

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspired by platforms like Duolingo
- etc
