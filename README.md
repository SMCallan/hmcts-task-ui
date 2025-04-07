# HMCTS Task Management - Frontend UI

## Project Overview

This repository contains the frontend user interface for the HMCTS Task Management system, developed as part of the DTS Developer Technical Test. This React application interacts with a separate backend API (`hmcts-task-api`) to provide a user-friendly way for caseworkers to manage their tasks.

Users can create, view, update the status of, and delete tasks through this interface.

## Live Demo

A deployed version of this frontend application, connected to the live backend API, can be accessed here:

*   **Live Application:** **[https://fluffy-paprenjak-e29c80.netlify.app](https://fluffy-paprenjak-e29c80.netlify.app)**

## Backend Repository

The corresponding backend API for this project can be found here:

*   **Backend API:** **[https://github.com/SMCallan/hmcts-task-api](https://github.com/SMCallan/hmcts-task-api)**

## Features Implemented

*   **View All Tasks:** Displays a list of existing tasks fetched from the backend.
*   **Create Task:** Provides a form to add new tasks (Title, Description, Status, Due Date).
*   **Update Task Status:** Allows users to change the status of a task directly from the list view.
*   **Delete Task:** Allows users to remove tasks (with confirmation).
*   **Loading & Error States:** Provides user feedback during API interactions.

## Technology Stack

*   **Framework/Library:** React (using Hooks)
*   **Language:** TypeScript
*   **Build Tool:** Vite
*   **API Client:** Axios
*   **Testing:** Jest, React Testing Library (`@testing-library/react`), `jest-dom`
*   **Styling:** CSS (via `App.css`)
*   **Development Environment:** Node.js, npm

## Prerequisites

Before running this project locally, ensure you have the following installed:

*   [Node.js](https://nodejs.org/) (LTS version recommended, includes npm)
*   [Git](https://git-scm.com/)
*   The **Backend API (`hmcts-task-api`) must be running** (either locally or the deployed version). This frontend needs the API to function.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SMCallan/hmcts-task-ui.git
    cd hmcts-task-ui
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    *   This application needs to know the URL of the backend API. Create a `.env` file in the root of the `hmcts-task-ui` project directory.
    *   Add the following line to the `.env` file, replacing the URL with the actual URL where your backend API is running:

        ```dotenv
        # .env file

        # For local development, if backend runs on port 3001:
        VITE_API_BASE_URL=http://localhost:3001/api

        # OR If connecting to the deployed backend:
        # VITE_API_BASE_URL=https://hmcts-task-api-production.up.railway.app/api
        ```
        **Important:** The variable name **must** start with `VITE_` for Vite to expose it to your frontend code. Use the `/api` path at the end.
    *   *(Optional but recommended)* Create a `.env.example` file with placeholder values and commit it.
    *   Ensure `.env` is listed in your `.gitignore` file (Vite's default usually includes this).

## Running the Application (Development Mode)

1.  **Ensure the Backend API is running.**
2.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173` or similar - check the terminal output).

## Running Tests

*   To run the component tests using Jest and React Testing Library:
    ```bash
    npm test
    ```
*   Tests cover rendering and basic interactions for the `TaskList` and `TaskForm` components.
*   **Note:** One test case within `TaskForm.test.tsx` related to synchronous client-side validation feedback is currently skipped (`test.skip`) due to difficulties replicating the exact browser rendering behavior within the Jest/JSDOM test environment. Manual testing confirms the validation works correctly in the live application.

## Deployment

This application is deployed to **Netlify**.

*   The production build connects to the deployed backend API via the `VITE_API_BASE_URL` environment variable configured in the Netlify site settings.
*   Build command: `npm run build`
*   Publish directory: `dist`

## Project Structure

The main application code resides within the `src` directory. Key configuration files (`vite.config.ts`, `tsconfig.json`, `jest.config.cjs`, `babel.config.cjs`, `.env`) are in the root.

```
hmcts-task-ui/
├── public/ # Static assets
├── src/ # Source code
│ ├── components/ # React UI components
│ │ ├── tests/ # Component tests
│ │ │ ├── TaskForm.test.tsx
│ │ │ └── TaskList.test.tsx
│ │ ├── TaskForm.tsx
│ │ └── TaskList.tsx
│ ├── services/ # API interaction logic
│ │ └── taskService.ts
│ ├── assets/ # Images, etc. (e.g., react.svg)
│ ├── App.css # Main application styles
│ ├── App.tsx # Main application component
│ ├── index.css # Global styles / resets
│ ├── main.tsx # Application entry point (renders App)
│ └── vite-env.d.ts # Vite TypeScript environment types
├── .env # Local environment variables (ignored by Git)
├── .env.example # Example environment variables
├── .gitignore # Files ignored by Git
├── babel.config.cjs # Babel config for Jest
├── index.html # Main HTML entry point (includes <title>)
├── jest.config.cjs # Jest test runner config
├── jest.setup.js # Jest setup file (e.g., import jest-dom)
├── package.json # Project dependencies and scripts
├── package-lock.json # Dependency lock file
├── README.md # This file
├── tsconfig.app.json # TypeScript config for the app
├── tsconfig.json # Base TypeScript config
├── tsconfig.node.json # TypeScript config for Node environment (e.g., Vite config)
└── vite.config.ts # Vite build tool config
```
