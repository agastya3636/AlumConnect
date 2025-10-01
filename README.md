# AlumConnect
<div align="center">

![AlumConnect Logo](https://github.com/agastya3636/AlumConnect/blob/main/frontend/src/assets/logo.png) <!-- Add actual logo/image URL -->
</div>

AlumConnect is a dynamic web platform designed to strengthen alumni relationships by connecting former students with their alma mater. Built for the **Smart India Hackathon 2024 (SIH 2024)**, this platform focuses on fostering collaboration, networking, and resource-sharing among alumni and students.

---

## 🏗️ Project Overview

AlumConnect enables alumni to stay engaged with their institution through features such as event notifications, mentoring opportunities, and a job portal. Students and alumni can connect in meaningful ways, creating a vibrant and supportive community.

---

## ✨ Features

- **User Authentication**: Secure login for alumni, students, and administrators.
- **Alumni Directory**: A searchable list of alumni with profiles including professional and academic details.
- **Event Management**: View and register for alumni events and webinars.
- **Job Portal**: Post and apply for job opportunities within the network.
- **Mentorship Program**: Facilitate mentor-mentee connections.
- **Real-time Chat**: Communicate with other users via integrated messaging.
- **Notifications**: Stay updated with important announcements and messages.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5, CSS3, JavaScript**
- **React.js**

### Backend
- **Node.js**
- **Express.js**
- **RESTful APIs** for data handling

### Database
- **MongoDB**

### Other Tools
- **Authentication**: JWT (JSON Web Tokens)
- **Cloud Hosting**: AWS / Heroku
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed on your system:
- **Node.js** (v16.x or above)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/agastya3636/SIH2024.git
   cd SIH2024
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   npm install

   # If frontend is separate, navigate to frontend directory
   cd client
   npm install
   cd ..
   ```

3. **Environment Configuration:**
   Create a `.env` file in the root directory and add the following variables:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database
   MONGODB_URI=mongodb://localhost:27017/alumconnect
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/alumconnect

   # JWT Secret
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d

   # Email Configuration (optional)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password

   # Frontend URL
   CLIENT_URL=http://localhost:3000
   ```

4. **Database Setup:**
   ```bash
   # Make sure MongoDB is running locally
   # Or use MongoDB Atlas connection string

   # Run database migrations/seeders if available
   npm run seed
   ```

5. **Start the application:**
   ```bash
   # Development mode (backend)
   npm run dev

   # In a separate terminal, start frontend (if separate)
   cd client
   npm start
   ```

6. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

---

## 🧑‍💼 Dummy Accounts for Testing

To make testing easier, here are some pre-seeded dummy accounts you can use:

### Alumni Account
```json
{
  "email": "alumni@example.com",
  "password": "alumni123",
  "name": "John Doe",
  "batch": "2018",
  "role": "alumni"
}
```

### Student Account
```json
{
  "email": "student@example.com",
  "password": "student123",
  "name": "Jane Smith",
  "batch": "2024",
  "role": "student"
}
```

### Admin Account
```json
{
  "email": "admin@example.com",
  "password": "admin123",
  "name": "Admin User",
  "role": "admin"
}
```

---

## 📁 Project Structure

```
AlumConnect/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.js
│   └── package.json
├── server/                # Backend application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   └── server.js
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/AlumConnect.git
   cd SIH2024
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

4. **Make your changes**
   - Write clean, maintainable code
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation if needed

5. **Test your changes**
   ```bash
   npm test
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

   **Commit Message Guidelines:**
   - `Add:` for new features
   - `Fix:` for bug fixes
   - `Update:` for updates to existing features
   - `Remove:` for removing code or files
   - `Docs:` for documentation changes

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes
   - Link any related issues

### Contribution Guidelines

- **Code Style**: Follow the existing code style and conventions
- **Testing**: Ensure all tests pass before submitting a PR
- **Documentation**: Update README and code comments as needed
- **Commits**: Write clear, concise commit messages
- **Issues**: Check existing issues before creating new ones
- **Pull Requests**: One feature/fix per PR for easier review

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Project Lead**: Agastya
- **Repository**: [github.com/agastya3636/AlumConnect](https://github.com/agastya3636/AlumConnect/)

---

## 📞 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/agastya3636/AlumConnect/issues)
- Email : agastyayadav2003@gmail.com

---

## 🙏 Acknowledgments

- Smart India Hackathon 2024 for providing the opportunity
- All contributors who have helped shape this project
- Open source community for the tools and libraries

---

## 📈 Project Status

This project was developed for **Smart India Hackathon 2024**. Active development and maintenance are ongoing.

**Current Version**: 1.0.0

---
<div align="center">
  
Made with ❤️ by Agastya and Team

</div>
