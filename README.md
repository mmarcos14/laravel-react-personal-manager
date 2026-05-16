
# 📒 Personal Finance & Notes Manager

A full-stack web application to manage personal finances and personal notes — built with **Laravel** (REST API) and **React.js** (frontend).

🌐 **Live Demo:** [ambroiseapp.com](https://ambroiseapp.com)
🐙 **Repository:** [github.com/mmarcos14/laravel-react-personal-manager](https://github.com/mmarcos14/laravel-react-personal-manager)

-----

## 🛠️ Tech Stack

|Layer   |Technology                                                    |
|--------|--------------------------------------------------------------|
|Frontend|React.js, React Bootstrap, React Router, Axios, React Toastify|
|Backend |Laravel (PHP), REST API                                       |
|Database|MySQL                                                         |
|Auth    |Laravel Sanctum (Token-based)                                 |
|Hosting |Hostinger                                                     |

-----

## ✨ Features

### 🔐 Authentication & Profile

- User registration, login, and password reset
- User profile management
- Secure token-based authentication with Laravel Sanctum
- Protected routes on the frontend

### 💰 Finance Tracker

- Track **Income, Expenses, Savings, Transport, Food, and Investments**
- Add, edit, and delete transactions
- Filter transactions by **date and type**
- Dashboard with financial statistics and summary

### 📝 Notes Manager

- Full CRUD operations (Create, Read, Update, Delete)
- Search notes by keyword
- Pagination for easy navigation

### 📬 Contact & Admin

- Contact form with message system
- Admin panel for user management

### 📊 Dashboard

- Overview of all finances and notes in one place
- Clean, responsive interface

-----

## ⚙️ Installation & Setup

### Prerequisites

- PHP >= 8.1
- Composer
- Node.js & npm
- MySQL

### Backend (Laravel)

```bash
# Clone the repository
git clone https://github.com/mmarcos14/laravel-react-personal-manager.git
cd laravel-react-personal-manager

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure your database in .env
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Start the server
php artisan serve
```

### Frontend (React.js)

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

-----

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/    # API Controllers
│   └── Models/              # Eloquent Models
├── routes/
│   └── api.php              # API Routes
├── database/
│   └── migrations/          # Database Migrations
└── frontend/
    ├── src/
    │   ├── components/      # React Components
    │   ├── pages/           # App Pages
    │   ├── services/        # Axios API Calls
    │   └── router/          # React Router Config
    └── public/
```

-----

## 🔗 API Endpoints

|Method|Endpoint            |Description           |
|------|--------------------|----------------------|
|POST  |/api/register       |Register a new user   |
|POST  |/api/login          |User login            |
|POST  |/api/forgot-password|Password reset        |
|GET   |/api/profile        |Get user profile      |
|PUT   |/api/profile        |Update user profile   |
|GET   |/api/finances       |Get all transactions  |
|POST  |/api/finances       |Create a transaction  |
|PUT   |/api/finances/{id}  |Update a transaction  |
|DELETE|/api/finances/{id}  |Delete a transaction  |
|GET   |/api/notes          |Get all notes         |
|POST  |/api/notes          |Create a note         |
|PUT   |/api/notes/{id}     |Update a note         |
|DELETE|/api/notes/{id}     |Delete a note         |
|POST  |/api/contact        |Send a contact message|

-----

## 👨‍💻 Author

**Ambroise Zounmenou**

- 🌐 [ambroiseapp.com](https://ambroiseapp.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/ambroise-zounmenou-87843b30b)
- 🐙 [GitHub](https://github.com/mmarcos14)

-----

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
