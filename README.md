# Matcha (Tinder Clone) Project

**Demo:** Explore the live demo of this project at [matcha.hmellahi.me](https://matcha.hmellahi.me)

## Project Overview

Matcha is a modern web application inspired by Tinder's swiping interface. It enables users to discover potential matches based on shared interests and location. If two users mutually swipe right on each other's profiles, they can connect and start chatting, potentially leading to meaningful connections.

<div align="center">
  <img src="https://github.com/hmellahi/Tinder-Clone/blob/master/Feed.png?raw=true" alt="Matcha Project" width="80%" style="box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
  <p><em>Screenshot of the Matcha Feed Page</em></p>
</div>

## Technology Stack

This project employs a range of cutting-edge technologies:

- Vue 3 with Composition API and Vite for optimized bundling
- Tailwind CSS for responsive and modern styling
- Express JS for building the server-side application logic
- Postgres for efficient data storage with native SQL queries
- WebSockets for real-time communication

## Installation

To run the Matcha project locally, follow these steps:

1. Ensure Docker is installed on your system. Refer to the Docker documentation for installation instructions.
2. Clone the project repository to your local machine.
3. Navigate to the `database` directory within the project using the terminal.
4. Execute the `sh run.sh` command to start the necessary database services.

Once the application is built and launched, access it by visiting [http://localhost:8890](http://localhost:8890) in your web browser.

## Key Features

### Registration and Signing-in

<div style="margin-left: 20px">✔️ Users can register with their email address, username, name, and protected password. A verification link is sent via email for account confirmation.</div>
<div style="margin-left: 20px">✔️ Secure user login and password reset functionality.</div>
<div style="margin-left: 20px">✔️ Convenient one-click logout from any page.</div>

### User Profile

<div style="margin-left: 20px">✔️ Users can create detailed profiles including gender, sexual preferences, biography, interests with reusable tags, and profile pictures.</div>
<div style="margin-left: 20px">✔️ Profile information is modifiable, including personal details.</div>
<div style="margin-left: 20px">✔️ Tracking of profile visits and "likes" received from other users.</div>
<div style="margin-left: 20px">✔️ Public "fame rating" to add an interactive element.</div>

### Browsing and Matching

<div style="margin-left: 20px">✔️ Users receive curated match suggestions based on geographic area, common tags, and "fame rating."</div>
<div style="margin-left: 20px">✔️ Intelligent matching prioritizes profiles from the same region and offers sort and filter options.</div>
<div style="margin-left: 20px">✔️ Advanced search functionality with customizable criteria, including age, "fame rating," location, and interests.</div>

### Interaction and Communication

<div style="margin-left: 20px">✔️ Explore other users' profiles, see their information, and track visits.</div>
<div style="margin-left: 20px">✔️ "Like" a profile picture to initiate connections for real-time chat when mutual.</div>
<div style="margin-left: 20px">✔️ Real-time chat functionality for connected users.</div>
<div style="margin-left: 20px">✔️ Notifications for events like receiving "likes," profile views, messages, and mutual "likes."</div>

### Location Services

<div style="margin-left: 20px">✔️ Integration of Google Maps for changing user location and enhancing the matching experience.</div>

## Contributing

Contributions and feedback are welcome! Feel free to create issues or pull requests to improve this project.

---

_Disclaimer: Matcha is a project created for educational purposes and is not affiliated with Tinder or any dating platform._
