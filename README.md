# Matcha (Tinder Clone) Project

## Project Overview
Matcha is similar to Tinder, which uses a swiping interface to help users find potential matches based on shared interests and location. Users can easily
connect and chat if they mutually swipe right on each other's profiles, potentially leading to a date.

<div align="center">
  <img src="https://github.com/hmellahi/Tinder-Clone/blob/master/Feed.png?raw=true" alt="Matcha Project" width="80%">
    <p><em>Screenshot of the Matcha Feed Page</em></p>
</div>

## Technology Stack
This project employs the following technologies:
- Express
- Vue 3 with Composition API
- Tailwind CSS
- Postgres (native SQL queries)


**Demo:** You can check out the live demo of this project at [matcha.hmellahi.me](https://matcha.hmellahi.me)

## Installation
To run the Web Matcha project, make sure you have Docker installed on your system. Follow the instructions for your operating system to install Docker.

Once Docker is installed, perform the following steps:

1. Clone the project repository to your local machine.
2. Open a terminal and navigate to the `database` directory within the project.
3. Run the `sh run.sh` command to start the necessary database services.

The application will be built and launched

You can access it by visiting `http://localhost:8890` in your web browser.

## IV.1 Registration and Signing-in
- [x] The app must allow a user to register by requesting at least their email address, username, last name, first name, and a password that is somehow protected. After registration, an email with a unique link must be sent to the registered user to verify their account.
- [x] The user must be able to login using their username and password, and also receive an email allowing them to reset their password if they forget it.
- [x] Additionally, the user must be able to log out with just one click from any page on the site.

## IV.2 User profile
- [x] Once a user is connected, they must fill out their profile by providing the following information:
  - [x] The gender.
  - [x] Sexual preferences.
  - [x] A biography.
  - [x] A list of interests with tags (e.g. #vegan, #geek, #piercing, etc.), which must be reusable.
  - [x] Up to 5 pictures, including one to be used as a profile picture.
- [x] At any time, the user must be able to modify this information, as well as their last name, first name, and email address.
- [x] The user must be able to check who has viewed their profile, as well as who has “liked” them.
- [x] The user must have a public “fame rating”.
  - ^1 Up to you to define what “fame rating” means as long as your criteria are consistent.

## IV.3 Browsing
- [x] The user must be able to easily get a list of suggestions that match their profile.
- [x] You will only propose “interesting” profiles. For example, only men for a heterosexual girl. You must manage bisexuality. If the user’s orientation isn’t specified, they will be considered bisexual.
- [x] You must cleverly match based on:
  - [x] Same geographic area as the user.
  - [x] A maximum of common tags.
  - [x] A maximum “fame rating”.
- [x] You must prioritize showing people from the same geographical area.
- [x] The list must be sortable by age, location, “fame rating”, and common tags.
- [x] The list must be filterable by age, location, “fame rating”, and common tags.

## IV.4 Research
- [x] The user must be able to conduct an advanced search by selecting one or more criteria, such as:
  - [x] An age gap.
  - [x] A “fame rating” gap.
  - [x] A location.
  - [x] One or multiple interest tags.
- [x] For the suggested list, the resulting list must be sortable and filterable by age, location, “fame rating”, and tags.
  - ^2 Yes, that’s what dating websites do...
  - ^3 Weight at least several criteria.

## IV.5 Profile of other users
- [x] A user must be able to view the profiles of other users. Profiles must contain all available information about them, except for the email address and password.
- [x] When a user views a profile, it must be added to their visit history.
- [x] The user must also be able to:
  - [x] “Like” another user’s profile picture. When two people “like” each other’s profiles, they will be considered “connected” and can start chatting. If the current user does not have a profile picture, they cannot complete this action.
  - [x] You should also remove your “like” to a user whom you had previously “liked”. The user will no longer generate notifications, and you will not be able to chat with them anymore.
  - [x] Check the “fame rating” of another user.
  - [x] See if a user is currently online, and if not, see the date and time of their last connection.
  - [x] Report a user as a “fake account”.
  - [x] Block a user. A blocked user will no longer appear in the search results and will not generate additional notifications. And, of course, it will no longer be possible to chat with them.
- [x] A user can clearly see if the profile they are viewing is connected or has “liked” their profile and must be able to “unlike” or disconnect from that profile.

## IV.6 Chat
- [x] When two users are connected, they must be able to “chat” in real-time. The implementation of the chat is up to you. The user must be able to see from any page if a new message is received.

## IV.7 Notifications
- [x] A user must be notified in real-time of the following events:
  - [x] When the user receives a “like”.
  - [x] When the user’s profile has been viewed.
  - [x] When the user receives a message.
  - [x] When a “liked” user also “likes” the user back.
  - ^4 You should also remove your “like” to a user whom you had previously “liked”. The user will no longer generate notifications, and you will not be able to chat with them anymore.
- [x] When two users are connected, they must be able to “chat” in real-time. The implementation of the chat is up to you. The user must be able to see from any page if a new message is received.
