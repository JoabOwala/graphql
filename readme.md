# graphql

# GraphQL Profile Viewer

This project is a web application that allows users to view their Zone01 profile information by querying a GraphQL API. It features a modern, responsive interface built with Tailwind CSS and includes dynamic SVG graphs to visualize user statistics.

## Features

- **User Authentication:** Secure login and logout functionality using JWT (JSON Web Tokens).
- **Dynamic Profile Page:** Displays user information, including username, total XP, and audit ratio.
- **Statistical Graphs:** Two dynamically generated SVG graphs:
  - **XP Over Time:** A smooth, curved line graph showing XP progression.
  - **Audit Performance:** A bar graph visualizing the user's audit up/down ratio.
- **Single Page Application (SPA):** A seamless user experience with no page reloads.
- **Modern UI:** A clean and professional design built with Tailwind CSS.

## Technologies Used

- **Frontend:**
  - HTML5
  - Tailwind CSS
  - Vanilla JavaScript (ESM)
- **API:**
  - GraphQL

## Getting Started

### Prerequisites

- A modern web browser that supports JavaScript Modules.
- Zone01 school credentials (username/email and password).

### Installation & Usage

No complex build process or dependencies are required. You can run this project in two ways:

1.  **Locally:**
    - Clone the repository:
      ```bash
      git clone <repository-url>
      ```
    - Open the `index.html` file in your web browser.

2.  **Hosted:**
    - The project is composed of static files (`.html`, `.css`, `.js`) and is deployed on GitHub Pages

## How It Works

1.  **Login:** The user enters their credentials, which are sent to the `signin` endpoint to retrieve a JWT.
2.  **Authentication:** The JWT is stored in the browser's `localStorage` and sent as a Bearer token in the header of all subsequent GraphQL API requests.
3.  **Data Fetching:** The application makes GraphQL queries to fetch user data, such as basic information, XP transactions, and audit stats.
4.  **UI Rendering:** The fetched data is dynamically rendered on the profile page.
5.  **Graph Generation:** The XP and audit data are used to generate interactive SVG graphs from scratch, providing a visual representation of the user's progress.
6.  **Logout:** The JWT is removed from `localStorage`, and the user is redirected to the login page.
