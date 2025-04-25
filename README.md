# Service Pronto

Service Pronto is a modern, full-stack Progressive Web Application (PWA) designed to streamline mobile service management. Built with a modular frontend and scalable backend, it empowers businesses to efficiently manage staff, locations, and service requests from any device.

## Features

- 🚀 **Progressive Web App**: Installable, offline-ready, and mobile-first.
- 👥 **Staff Management**: Add, edit, and manage staff members with ease.
- 📍 **Location Management**: Organize and update service locations.
- 🗂️ **Service Requests**: Track, create, and manage service requests in real-time.
- 🔒 **Authentication**: Secure login and role-based access (customizable).
- 📊 **Analytics**: Dashboard-ready for insights (extendable).

## Technology Stack

- **Frontend**: React (with Context API), HTML5, CSS3
- **Backend**: Node.js, Express (customizable for your needs)
- **Database**: (Pluggable; e.g., MongoDB, PostgreSQL, etc.)
- **Deployment**: Easily deployable to cloud or on-premises

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:Sakeeb91/service-pronto.git
cd service-pronto

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Running the App
```bash
# Start frontend (in /frontend)
npm start

# Start backend (in /backend)
npm start
```

The frontend will typically run on `http://localhost:3000` and the backend on `http://localhost:5000` (configurable).

### Building for Production
```bash
cd frontend
npm run build
```

## Project Structure
```
service-pronto/
├── backend/    # Express backend
├── frontend/   # React frontend
└── .gitignore
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Contact
For questions or support, open an issue or contact the maintainer at [github.com/Sakeeb91](https://github.com/Sakeeb91).
