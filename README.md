# Train Seat Booking System

A full-stack application for train seat reservations built with Next.js, Node.js, and PostgreSQL.


<img width="202" alt="homepage" src="https://github.com/user-attachments/assets/0070bab4-8c43-4556-9489-d551a19dc3aa" />
<img width="176" alt="image" src="https://github.com/user-attachments/assets/e76cdda7-f9b3-4714-a3ac-3a87d5e04d8f" />




## Features

- User authentication (Google, GitHub, Email)
- Seat reservation system with intelligent allocation
- Responsive design across all devices
- Real-time seat availability updates
- Booking management (create/cancel)

## Frontend

### Tech Stack
- Next.js 14
- NextAuth.js
- Prisma ORM
- Tailwind CSS
- AWS Amplify (CI/CD)

### Setup
```bash
# Clone repository
git clone https://github.com/its-samarth/workwise.git
cd workwise

# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local

# Required environment variables
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
NEXT_PUBLIC_API_URL=your_backend_url

# Development
npm run dev

# Production build
npm run start
```  

### Directory Structure
```
app/
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       ├── authOptions.ts
│   │       └── route.js
│   └── users/
│       └── route.ts
├── components/
│   ├── Navbar.tsx
│   ├── SessionWrapper.js
│   └── TrainCoach.js
├── favicon.ico
├── globals.css
├── layout.tsx
├── lib/
│   └── prisma.ts
├── middleware.js
├── page.tsx
├── services/
│   └── api.js
├── train/
│   └── page.js
└── utils/
    └── api.js

```
