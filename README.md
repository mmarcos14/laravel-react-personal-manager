# Laravel + React Personal Finance & Notes Manager

## Description
This project is a fullstack web application built with Laravel (API) and React.js (frontend).  
It allows users to manage personal finances, track expenses, income, savings, and also write personal notes.

Live demo: https://ambroiseapp.com/

---

## Features

- Authentication (Register / Login / Reset Password)
- User profile management
- Expense tracking (Income, Spent, Saving, Transport, Food, Investment)
- Dashboard with statistics
- Filter transactions by date and type
- Notes management (CRUD, search, pagination)
- Contact form with message system
- Admin user management

---

## Tech Stack

### Backend
- Laravel
- REST API
- MySQL

### Frontend
- React.js
- React Bootstrap
- Axios
- React Router
- React Toastify

---

## Screenshots


---

## Installation

### Backend (Laravel)
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
