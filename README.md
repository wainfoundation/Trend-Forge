# Trend Forge

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/stack-Node.js%20%7C%20Express%20%7C%20PostgreSQL%20%7C%20HTML%2FTailwind-lightgrey)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)
![Made with Pi Network](https://img.shields.io/badge/built%20with-Pi%20Network-orange)

**Trend Forge** is a news and analysis platform delivering in-depth global insights. Covering World, Business, Finance, Science, and Culture, it features a subscription model powered by Pi Network cryptocurrency. The frontend is built with HTML, Tailwind CSS, and JavaScript, while a proposed Node.js/Express backend with PostgreSQL supports dynamic features like contact forms, search, subscriptions, and article management.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Pi Network Integration](#pi-network-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Code of Conduct](#code-of-conduct)
- [License](#license)
- [Contact](#contact)

## Features
- **Responsive Frontend**: Static HTML pages styled with Tailwind CSS, Font Awesome, and Google Fonts (`Roboto`, `Roboto Slab`), using red (`#e3120b`) accents.
- **Content Sections**: Articles in World, Business, Finance, Science, Culture, and Pi Network News (`pinetwork.html`), with full-length articles (e.g., `world/article1.html`).
- **Dynamic Features** (proposed):
  - Contact form (`contact.html`) with database storage and email notifications.
  - Search (`search.html`) for articles by keyword.
  - Pi Network subscriptions (`subscribe.html`, e.g., 6 PI/month).
- **Premium Content**: Selected articles (e.g., `world/article1.html`) marked as Premium.
- **Splash Screen**: `splash.html` redirects to `index.html` after 3 seconds.
- **Support Pages**:
  - Security (`security.html`)
  - FAQ (`faq.html`)
  - Contribute (`contribute.html`)
  - Code of Conduct (`code_of_conduct.html`)
  - Documentation (`docs.html`)
  - License (`license.html`)

## Project Structure

```
/trend-forge
├── /frontend                   # Static frontend files
│   ├── index.html
│   ├── 404.html
│   ├── about.html
│   ├── subscribe.html
│   ├── world.html
│   ├── search.html
│   ├── business.html
│   ├── finance.html
│   ├── science.html
│   ├── culture.html
│   ├── contact.html
│   ├── privacy.html
│   ├── terms.html
│   ├── splash.html
│   ├── splash.js
│   ├── pinetwork.html
│   ├── security.html
│   ├── faq.html
│   ├── contribute.html
│   ├── code_of_conduct.html
│   ├── docs.html
│   ├── license.html
│   ├── /world
│   │   ├── article1.html
│   │   ├── article2.html
│   │   ├── article3.html
├── /backend
│   ├── /config
│   │   ├── database.js
│   │   ├── env.js
│   │   ├── pi-network.js
│   ├── /controllers
│   │   ├── contact.js
│   │   ├── search.js
│   │   ├── subscription.js
│   │   ├── article.js
│   ├── /middleware
│   │   ├── auth.js
│   │   ├── validate.js
│   │   ├── error.js
│   ├── /models
│   │   ├── user.js
│   │   ├── contact.js
│   │   ├── article.js
│   ├── /routes
│   │   ├── contact.js
│   │   ├── search.js
│   │   ├── subscription.js
│   │   ├── article.js
│   │   ├── index.js
│   ├── /services
│   │   ├── email.js
│   │   ├── pi-network.js
│   │   ├── search.js
│   ├── /utils
│   │   ├── logger.js
│   │   ├── response.js
│   ├── /tests
│   │   ├── contact.test.js
│   │   ├── search.test.js
│   │   ├── subscription.test.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   ├── Dockerfile
├── README.md
├── .gitignore
```

## Technologies
- **Frontend**: HTML5, Tailwind CSS (CDN), JavaScript, Font Awesome, Google Fonts.
- **Backend** (proposed): Node.js, Express, PostgreSQL, JWT, Joi, Winston.
- **External Services**: Pi Network API, SendGrid.
- **Tools**: Docker, Jest, ESLint, Git.

## Setup Instructions

### Prerequisites
- Node.js v16+
- PostgreSQL v13+
- Git
- Docker (optional)
- Pi Network API Key
- SendGrid API Key (optional)

### Local Development

1. **Clone the Repository**:
```bash
git clone https://github.com/your-username/trend-forge.git
cd trend-forge
```

2. **Install Backend Dependencies**:
```bash
cd backend
npm install
```

3. **Set Up PostgreSQL**:
Create a database:
```sql
CREATE DATABASE trend_forge;
```

4. **Configure Environment Variables**:
```bash
cp backend/.env.example backend/.env
```
Edit `.env` with your own credentials (see below).

5. **Start the Backend**:
```bash
npm run start
```
Runs on `http://localhost:3000`.

6. **Serve the Frontend**:
Option 1 (backend static): Serve `/frontend` using Express.

Option 2 (standalone):
```bash
cd frontend
npm install -g live-server
live-server
```
Access at `http://localhost:8080`.

7. **Test**:
- Splash screen (`splash.html`) redirects after 3 seconds.
- Use Postman for backend endpoints.
- Check form submission and article routing.

### Environment Variables

In `/backend/.env`:

```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/trend_forge
PI_API_KEY=your_pi_network_api_key
PI_API_URL=https://api.pi.network/v1
SENDGRID_API_KEY=your_sendgrid_api_key
SUPPORT_EMAIL=support@trendforge.com
JWT_SECRET=your_jwt_secret
```

## Usage

- Access: `http://localhost:8080` or deployed URL.
- Browse content by category.
- Use the contact form or search articles.
- Subscribe with Pi Network to unlock premium content.

## API Endpoints

| Method | Endpoint                  | Description                 | Middleware         |
|--------|---------------------------|-----------------------------|--------------------|
| POST   | /api/contact              | Submit contact form         | validate           |
| GET    | /api/search?q=query       | Search articles             | none               |
| POST   | /api/subscribe            | Subscribe via Pi Network    | auth, validate     |
| GET    | /api/subscribe/status     | Check subscription status   | auth               |
| GET    | /api/articles             | List all articles           | none               |
| GET    | /api/articles/:id         | Get article (check premium) | auth               |

## Pi Network Integration

- **Subscription**: `subscribe.html` handles Pi Network payments (e.g., 6 PI/month).
- **Status Check**: Placeholder logic for subscription verification.
- **Integration File**: Update `/backend/services/pi-network.js` with SDK logic once available.

## Deployment

- **Monolith** (Heroku/AWS):
```bash
npm run build
```

- **Split Deployment**:
  - Frontend: Netlify or Vercel (`/frontend`)
  - Backend: Heroku or AWS (`/backend`)

- **Docker**:
```bash
docker build -t trend-forge .
docker run -p 3000:3000 --env-file backend/.env trend-forge
```

- **Database Hosting**: AWS RDS or Supabase.
- **SSL**: Use Let’s Encrypt or Cloudflare for HTTPS.

## Contributing

See `contribute.html` for detailed guidelines:

1. Fork the repo
2. Create a new branch:
```bash
git checkout -b feature/your-feature
```
3. Commit changes:
```bash
git commit -m "Add your feature"
```
4. Push and open a pull request.

## Code of Conduct

We follow a respectful and inclusive [Code of Conduct](frontend/code_of_conduct.html).

## License

MIT License. See [license.html](frontend/LICENSE.html).

## Contact

- 📧 Email: [support@trendforge.com](mailto:support@trendforge.com)
- 🌐 Website: [Contact Page](frontend/contact.html)
- 🧠 Social: Twitter, Facebook, LinkedIn, Instagram
```
