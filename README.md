# Office Meal Management System

Office Meal Management System is a web application built to manage meal scheduling and ordering within an office environment. This project utilizes React for the frontend, PostgreSQL for the database, Redux for state management, TanStack Query for API handling, Express for backend services, and JWT Authentication for user authentication and authorization.

## Key Features

- **Authentication**
  - Sign-In Page (email and password credentials)
  - JWT-based Authentication
  - Banned Users Management

- **User Management (Admins Only)**
  - Add, Update, Ban Users
  - Roles: Admin and General Users
  - Data Table with Filters (Search, Pagination)

- **Item Management (Admins Only)**
  - Add and Delete Items
  - Categorized Food Items

- **Meal Management (Admins Only)**
  - Schedule Meals for 7 Days a Week
  - Meal Constraints:
    - Rice Item Required
    - Minimum 3 Items
    - Single Protein Source
  - Day-specific Meal Scheduling
  - Weekly Meal Repetition Control

- **Meal Order (General Users)**
  - View Weekly Meal Schedules
  - Select and Update Meal Choices
  - Monthly Meal Scheduling
  - Option for "No Meal"

- **Meal Schedule (Admins Only)**
  - View Meal Choices for Each User

## Installation and Setup

### Prerequisites

- Node.js (v18.16.0 or higher)
- PostgreSQL

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/office-meal-management-system.git
   cd office-meal-management-system
cd backend <br>
npm install <br>
npm start <br>
# Frontend Setup  <br>
cd ../frontend <br>
npm install <br>
npm start <br>
### Usage
Admin Dashboard: Access http://localhost:3000/adminLogin after signing in as an admin to manage users, items, meals, and schedules.<br>
User Interface: General users can access their meal schedules and make selections through http://localhost:3000.<br>
### Technologies Used
### Frontend:

 - React
 - Redux
 - TanStack Query
 - React Router
 - Axios

  
### Backend:

 - Node.js
-Express
-Sequelize (ORM for PostgreSQL)
-JWT Authentication
### Database:

-PostgreSQL
