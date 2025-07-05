# HR Performance Dashboard

A comprehensive Human Resources management system built with React, featuring employee performance tracking, analytics, and modern UI/UX design.

## 🚀 Live Demo

**[View Live Application](https://startling-toffee-28e615.netlify.app/)**

## 📸 Screenshots

### Login Page
![Login Page](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-04%20163414-ZUWRA7Jd2ZjEjC7EtvqhwcDdBHRjZr.png)

### Dashboard Overview
![Dashboard](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-07-04%20163448-hZ7LGMEeUbNKcQ993cFcGPvlugUQh2.png)

## ✨ Features

### 🔐 Authentication System
- Secure login with demo credentials
- Session management with persistent storage
- User profile management with dropdown menu
- Logout confirmation and clean session cleanup

### 👥 Employee Management
- **Employee Dashboard**: View all employees in an organized card layout
- **Employee Details**: Comprehensive employee profiles with tabs for:
  - Personal information and performance history
  - Project tracking with completion status
  - Feedback management system
- **Performance Ratings**: 5-star rating system with visual indicators
- **Department Organization**: Categorized by Engineering, Marketing, Sales, HR, Finance, Operations

### 🔍 Search & Filtering
- **Advanced Search**: Search by name, email, or department
- **Multi-filter System**: Filter by departments and performance ratings
- **Real-time Results**: Instant filtering as you type
- **Filter Management**: Clear all filters with one click

### 📌 Bookmark System
- **Save Employees**: Bookmark important employees for quick access
- **Dedicated Bookmarks Page**: Separate view for all bookmarked employees
- **Persistent Storage**: Bookmarks saved in localStorage
- **Visual Indicators**: Clear bookmark status on employee cards

### 📊 Analytics Dashboard
- **Performance Metrics**: Department-wise average ratings
- **Visual Charts**: Bar charts, line graphs, and doughnut charts
- **Key Statistics**: Total employees, bookmarks, average ratings
- **Department Breakdown**: Detailed statistics per department
- **Trend Analysis**: Bookmark trends over time

### 🎨 Modern UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Smooth Animations**: Fade-in effects and hover transitions
- **Accessible Design**: ARIA labels, keyboard navigation, screen reader support
- **Professional Styling**: Clean, modern interface with Tailwind CSS

### 🔧 Technical Features
- **React Context API**: State management for employees, bookmarks, and themes
- **React Router**: Client-side routing with protected routes
- **Custom Hooks**: Reusable logic for search, bookmarks, and authentication
- **Local Storage**: Persistent data storage for user preferences
- **Error Handling**: Comprehensive error states and loading indicators

## 🛠️ Technology Stack

- **Frontend**: React 18 with functional components and hooks
- **Styling**: Tailwind CSS for responsive design
- **Routing**: React Router DOM v6
- **State Management**: React Context API with useReducer
- **Data Fetching**: Native fetch API with DummyJSON API
- **Icons**: Lucide React icons
- **Charts**: Custom canvas-based chart components
- **Build Tool**: Vite for fast development and building
- **Deployment**: Netlify for continuous deployment

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hr-performance-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Demo Credentials
- **Username**: `admin`
- **Password**: `password`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Badge.jsx       # Status badges
│   ├── Chart.jsx       # Custom chart components
│   ├── EmployeeCard.jsx # Employee card component
│   ├── Layout.jsx      # Main layout wrapper
│   ├── LoadingSpinner.jsx
│   ├── Navbar.jsx      # Top navigation
│   ├── SearchAndFilter.jsx
│   ├── Sidebar.jsx     # Side navigation
│   ├── StarRating.jsx  # Rating component
│   └── UserMenu.jsx    # User dropdown menu
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   ├── HRContext.jsx   # Employee data management
│   └── ThemeContext.jsx # Theme management
├── hooks/              # Custom React hooks
│   ├── useBookmarks.js # Bookmark functionality
│   └── useSearch.js    # Search and filtering
├── pages/              # Page components
│   ├── Analytics.jsx   # Analytics dashboard
│   ├── Bookmarks.jsx   # Bookmarked employees
│   ├── Dashboard.jsx   # Main employee dashboard
│   ├── EmployeeDetails.jsx # Individual employee view
│   └── Login.jsx       # Authentication page
├── App.jsx             # Main app component
├── App.css             # Global styles
└── main.jsx            # Application entry point
```

## 🎯 Key Features Breakdown

### Employee Performance Tracking
- Visual performance ratings with star system
- Historical performance data tracking
- Project completion status monitoring
- Feedback collection and management

### Advanced Analytics
- Department-wise performance analysis
- Employee distribution charts
- Bookmark trend analysis
- Key performance indicators (KPIs)

### User Experience
- Intuitive navigation with sidebar
- Responsive design for all devices
- Fast search and filtering capabilities
- Persistent user preferences

### Security & Authentication
- Secure login system
- Protected routes
- Session management
- User profile management

## 🌟 Future Enhancements

- [ ] Employee creation and editing functionality
- [ ] Advanced reporting and export features
- [ ] Email notifications system
- [ ] Integration with external HR systems
- [ ] Multi-language support
- [ ] Advanced user roles and permissions
- [ ] Real-time collaboration features
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ by [Ishant kumar yadav]

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing mock employee data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the powerful UI library
- [Netlify](https://netlify.com/) for seamless deployment

---

**[🚀 View Live Demo](https://startling-toffee-28e615.netlify.app/)**
```

This comprehensive README.md file includes:

1. **Project Overview**: Clear description of what the HR Dashboard does
2. **Live Demo Link**: Prominently featured at the top
3. **Screenshots**: Both images embedded using the provided URLs
4. **Detailed Features**: Comprehensive list of all functionality
5. **Technology Stack**: All technologies used
6. **Getting Started**: Step-by-step installation instructions
7. **Project Structure**: Clear file organization
8. **Demo Credentials**: Login information for testing
9. **Future Enhancements**: Roadmap for development
10. **Professional Formatting**: Clean, organized, and easy to read

The README follows best practices for open-source projects and provides all the information needed for users, contributors, and potential employers to understand the scope and quality of your HR Dashboard project.