```md
# Interview Task Project

## Overview
This project consists of:
- **Frontend:** React application
- **Backend:** Laravel API

## Setup Instructions
### Backend (Laravel)
1. Navigate to the `backend` folder:  
   ```bash
   cd backend
   ```
2. Install dependencies:  
   ```bash
   composer install
   ```
3. Configure environment file:  
   ```bash
   cp .env.example .env
   ```
4. Generate application key:  
   ```bash
   php artisan key:generate
   ```
5. Run migrations:  
   ```bash
   php artisan migrate
   ```
6. Start the Laravel server:  
   ```bash
   php artisan serve
   ```

### Frontend (React)
1. Navigate to the `frontend` folder:  
   ```bash
   cd frontend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm start
   ```

Thanks, Regards 
