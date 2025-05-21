# Student Attendance Tracker

A full-stack **Student Attendance Tracker** built with **Node.js**, **React.js**, **Express.js**, **PostgreSQL**, and **Prisma ORM**.  
This application allows teachers to log in, add students, mark them as present or absent, and view real-time attendance updates with graphical representations.

## Features

- **Teacher Login:** Secure login system for teachers.
- **Student Management:** Add and manage student details easily.
- **Attendance Tracking:** Mark students as **Present** or **Absent**.
- **Class-wise Filtering:** Students can be filtered based on their class.
- **Real-Time Dashboard:** 
  - Bar graph showing count of Present vs Absent students.
  - Pie chart giving a visual breakdown of attendance.
  - Graphs update live as student data changes.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/harrshitaSingh/student-attendance-tracker.git
   cd student-attendance-tracker
   
2. **Install backend dependencies:**
    ```bash
     cd server
     npm install

4. **Install frontend dependencies:**
    ```bash
    cd client
    npm install

6. **Configure environment variables:**
   Create a .env file in the backend folder.
   Add your database URL and any other required configurations.

7. **Start backend server:**
      ```bash
       npm run dev

8. **Start frontend React app:**
    ```bash
      npm start

10. **Database Setup:**
   Ensure PostgreSQL is installed and running.
   Run Prisma migrations:
   ```bash
   npx prisma migrate dev --name init


