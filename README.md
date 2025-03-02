# Gym Application

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Backend](#backend)
- [Frontend](#frontend)
- [QA Automation](#qa-automation)


## Introduction
The Gym Application is a comprehensive solution for managing gym memberships, schedules, and more. This project includes both backend and frontend components, as well as QA automation.

## Features
### User Features
- Search for workouts in the gym
- View all available coaches and their details
- Book workouts
- Provide feedback on workouts
- User authentication (login/signup)
- View booked workout history
- Check the status of workouts (scheduled, cancelled, waiting for feedback)
- View profile
- Update profile

### Coach Features
- Login to the application
- View profile
- Update profile
- View workouts booked for them
- Cancel workouts
- Provide feedback to clients

### Admin Features
- Login to the application
- See reporting interface
- Generate reports using given filters
- See all the previous reports 
- See each report in detailed format.
- Download reports in .pdf, .xls, .csv formats

## Installation
### Prerequisites
- Java JDK
- Maven
- Node.js
- npm or yarn

### Backend
1. Navigate to the backend directory:
    ```sh
    cd backend/gym-app
    ```
2. Build the application:
    ```sh
    mvn clean install
    ```
3. Run the application:
    ```sh
    mvn spring-boot:run
    ```

### Frontend
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    npm install
    ```
3. Run the application:
    ```sh
    npm run dev
    ```

## Usage
- Access the frontend application at `https://frontend-app-run4team5-frontend-dev.shared.edp-dev.cloudmentor.academy/`
- Access the backend API at `https://gym-application-run4team5-sb-dev.shared.edp-dev.cloudmentor.academy`


## Backend
The backend is built using `Java Spring Boot` and `Spring Security`. It handles all the server-side logic, including database management, user authentication, and API endpoints.

## Frontend
The frontend is built using `React` and `Tailwind CSS`. It provides a user-friendly interface for interacting with the gym management system. We use Vitest for frontend unit testing.

## QA Automation
The QA automation scripts are located in the [qa-automation](https://git.epam.com/epm-edai/project-runs/run-4/team-5/serverless/gym-application/-/tree/feature_qa?ref_type=heads) directory. These scripts are used for automated testing of the application using Java.
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

