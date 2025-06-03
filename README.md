

SmartDoc is a mobile-first health platform designed for Nigeria’s healthcare system, leveraging AI to automate patient history intake, follow-up, and telehealth. This repository contains the **frontend** of SmartDoc, built with **Vite** and **React**, providing intuitive interfaces for patients (via WhatsApp and mobile app) and doctors (via web portal and mobile app). It supports offline functionality, multilingual processing (Yoruba, Hausa, Igbo, Pidgin), and integrates with a FastAPI backend powered by Llama AI.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)
- [Contact](#contact)

## Features
- **Patient Interface**:
  - WhatsApp chatbot integration for text/voice input of symptoms/history.
  - Mobile app (React-based) for logging health metrics (e.g., blood sugar) with offline caching.
  - Multilingual support for Yoruba, Hausa, Igbo, and Pidgin.
- **Doctor Interface**:
  - Web portal for reviewing AI-generated patient summaries and updating diagnoses.
  - Mobile app for on-the-go access.
- **Telehealth**:
  - Video/audio consultations via WebRTC/Jitsi.
- **Offline Support**:
  - Local caching using IndexedDB for low-connectivity areas (36% broadband access in Nigeria).
- **Accessibility**:
  - Optimized for Nigeria’s 70% mobile penetration, supporting low-end devices.

## Tech Stack
- **Framework**: React (v18)
- **Build Tool**: Vite (v5)
- **Language**: JavaScript (ES6+)
- **Styling**: CSS Modules / Tailwind CSS (optional)
- **State Management**: React Context or Redux (TBD)
- **API Client**: Axios for django backend integration
- **Offline Storage**: IndexedDB (via Dexie.js)
- **Telehealth**: Jitsi Meet SDK
- **Linting/Formatting**: ESLint, Prettier

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or higher): [Download](https://nodejs.org/)
- **npm** (v8 or higher, comes with Node.js) or **yarn** (optional)
- **Git**: [Download](https://git-scm.com/)
- A modern browser (e.g., Chrome, Firefox) for development
- (Optional) Backend setup: https://github.com/smart-doc/SmartDoc-BE for django and Llama AI integration

## Setup Instructions
Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/smart-doc/SmartDoc-FE
   cd SmartDoc-FE
   ```
2. **Install dependencies**
   ```bash
   npm install
   or
   yarn install
  ```
3. **Configure enviroment variables**
  ```bash
  VITE_API_URL= 
  VITE_WHATSAPP_API_KEY=your_twilio_key  # Twilio WhatsApp API key
  VITE_JITSI_DOMAIN=meet.jit.si  # Jitsi server for telehealth
  ```
4. **Run the developement server**
   ```bash
   npm run dev
   or
   yarn dev
   ```
5. **Build for production**
   ```bash
   npm run build
   ```

## Project Structure
SmartDoc-FE/
├── public/               # Static assets (e.g., favicon, logo)
├── src/                  # Source code
│   ├── assets/           # Images, fonts
│   ├── components/       # Reusable React components (e.g., Chatbot, VideoCall)
│   ├── pages/            # Page components (e.g., PatientDashboard, DoctorPortal)
│   ├── services/         # API calls (Axios)
│   ├── styles/           # CSS Modules or Tailwind styles
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md             # This file

## Contributing
We welcome contributions to SmartDoc! Follow these steps:
.. Fork the repository.
.. Create a feature branch (git checkout -b feature/your-feature).
.. Commit changes (git commit -m "Add your feature").
.. Push to the branch (git push origin feature/your-feature).
.. Open a pull request with a clear description.

## Contributors
- [@collaborator1](ulokoblessing32@gmail.com)
- [@collaborator2](github.com/Adams99Abubakry)
- [@collaborator3](github.com/fawwazmak)

## License
This project is licensed under the MIT License. See LICENSE for details.
Contact
For questions or support, contact:
Maintainer: Chukwuemeka Obasi (obasyemeka@gmail.com)

GitHub Issues: Open an issue



