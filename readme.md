# Task Manager Application

## Introduction

The Task Manager Application is a powerful and user-friendly tool for managing tasks. It allows users to efficiently organize and track their tasks using a simple and intuitive interface. Built with React on the client side and Node.js on the server side, this application offers a range of features to enhance productivity.

## Features

- **User Authentication**:

  - Secure sign-in and sign-out with Google authentication.
  - User-specific task management.

- **Task Management**:

  - **Add Tasks**: Easily create new tasks with a title, description, and status.
  - **Edit Tasks**: Modify existing tasks to update their details or change their status.
  - **Delete Tasks**: Remove tasks that are no longer needed.

- **Task Status Management**:

  - Organize tasks into different statuses (e.g., To Do, In Progress, Completed).
  - **Drag-and-Drop Functionality**: Move tasks between different statuses using drag-and-drop.

- **Task Filtering and Search**:

  - **Search Tasks**: Quickly find tasks by title or description using the search bar.
  - **Filter Tasks**: Filter tasks based on their status to focus on specific categories.

- **Responsive Design**:

  - Fully responsive UI that adapts to different screen sizes for an optimal user experience on both desktop and mobile devices.

- **Modal Form**:

  - A modal component for adding tasks, providing a streamlined user experience.

- **Profile Management**:
  - Display user profile information with a profile picture.
  - Access a logout option via a user menu that opens when clicking on the profile picture.

## Usage

1. **Sign In**: Click the "Sign In with Google" button to authenticate using your Google account.

2. **Manage Tasks**:

   - **Add a Task**: Click the "Add Task" button to open the task form modal and enter the details for a new task.
   - **Edit a Task**: Click on a task and modify its details using the task form.
   - **Delete a Task**: Click the delete icon next to the task you wish to remove.

3. **Organize Tasks**:

   - Drag and drop tasks between different status columns to update their progress.

4. **Filter and Search**:
   - Use the search bar to find specific tasks.
   - Apply filters to view tasks based on their status.

Please refer to the [Project Setup](#project-setup) section for detailed steps on how to set up and run the application locally.

# Project Setup

## Prerequisites

- Node.js and npm installed

## Getting Started

#### Clone the repository

git clone [https://github.com/Omnish007/task-manager.git](https://github.com/Omnish007/task-manager.git)

```bash

# Navigate to the client folder
cd client

# Install client-side dependencies
npm install

# Navigate to the server folder
cd ../server

# Install server-side dependencies
npm install

# Create .env files in server and client both

# Copy example.env from client and server

# Replace dummy data in .env files with your Firebase API keys in client env and MongoDB URL in server env files

# Start both development servers using below command.
npm run dev

```
