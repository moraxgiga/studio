# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## How to Run the Code and Check the Website on Localhost

This guide will walk you through the steps to run the website locally on your machine.

### Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system.

1.  **Verify Node.js and npm Installation:**
    *   Open your terminal or command prompt.
    *   Check if Node.js is installed by running: `node -v`
    *   Check if npm is installed by running: `npm -v`
    *   If these commands return version numbers, you're good to go. Otherwise, you'll need to install Node.js from [https://nodejs.org/](https://nodejs.org/). npm is typically included with Node.js.

### Steps to Run the Website

1.  **Navigate to the Project Directory:**
    *   Open your terminal and use the `cd` command to navigate to the root directory of your project. For example: `cd <your_project_directory>`
2.  **Install Dependencies:**
    *   Run the command: `npm install`
    *   This command reads the `package.json` file and installs all the necessary dependencies listed in it. These are the external libraries and tools required for the project.
3.  **Start the Development Server:**
    *   Run the command: `npm run dev`
    *   This command starts a local development server, which will host the website on your machine. You will likely see messages in your terminal indicating that the server has started.
4.  **Access the Website:**
    *   Open your web browser (e.g., Chrome, Firefox, Safari).
    *   Go to the following address: `http://localhost:3000`
    *   This is the default address for Next.js development servers. You should now see the website in your browser.

### Troubleshooting

*   If the website doesn't load, check the terminal for any error messages.
*   Make sure that no other application is using port 3000. If it is, you might need to stop that application or configure the Next.js server to use a different port.


