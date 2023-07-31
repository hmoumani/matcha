# Web Matcha Project

## IV.1 Registration and Signing-in

- &#x2705; The app must allow a user to register by requesting at least their email address, username, last name, first name, and a password that is somehow protected. After registration, an email with a unique link must be sent to the registered user to verify their account.
- &#x2705; The user must be able to login using their username and password, and also receive an email allowing them to reset their password if they forget it.
- &#x2705; Additionally, the user must be able to log out with just one click from any page on the site.

## IV.2 User profile

- &#x2705; Once a user is connected, they must fill out their profile by providing the following information:
  - &#x2705; The gender.
  - &#x2705; Sexual preferences.
  - &#x2705; A biography.
  - &#x2705; A list of interests with tags (e.g. #vegan, #geek, #piercing, etc.), which must be reusable.
  - &#x2705; Up to 5 pictures, including one to be used as a profile picture.
- &#x2705; At any time, the user must be able to modify this information, as well as their last name, first name, and email address.
- &#x2705; The user must be able to check who has viewed their profile, as well as who has “liked” them.
- &#x2705; The user must have a public “fame rating”^1.

## IV.3 Browsing

- &#x2705; The user must be able to easily get a list of suggestions that match their profile.
- &#x2705; You will only propose “interesting” profiles. For example, only men for heterosexual girls. You must manage bisexuality. If the user’s orientation isn’t specified, they will be considered bisexual.
- &#x2705; You must cleverly match^3 based on:
  - &#x2705; Same geographic area as the user.
  - &#x2705; A maximum of common tags.
  - &#x2705; A maximum “fame rating”.
- &#x2705; You must prioritize showing people from the same geographical area.
- &#x2705; The list must be sortable by age, location, “fame rating”, and common tags.
- &#x2705; The list must be filterable by age, location, “fame rating”, and common tags.

## IV.4 Research

- &#x2705; The user must be able to conduct an advanced search by selecting one or more criteria, such as:
  - &#x2705; An age gap.
  - &#x2705; A “fame rating” gap.
  - &#x2705; A location.
  - &#x2705; One or multiple interest tags.
- &#x2705; For the suggested list, the resulting list must be sortable and filterable by age, location, “fame rating”, and tags.

## IV.5 Profile of other users

- &#x2705; A user must be able to view the profiles of other users. Profiles must contain all available information about them, except for the email address and password.
- &#x2705; When a user views a profile, it must be added to their visit history.
- &#x2705; The user must also be able to:
  - &#x2705; “Like” another user’s profile picture. When two people “like” each other’s profiles, they will be considered “connected” and can start chatting. If the current user does not have a profile picture, they cannot complete this action.
  - &#x2705; Remove their “like” from a user whom they had previously “liked”. The user will no longer generate notifications, and they will not be able to chat with them anymore.
  - &#x2705; Check the “fame rating” of another user.
  - &#x2705; See if a user is currently online, and if not, see the date and time of their last connection.
  - &#x2705; Report a user as a “fake account”.
  - &#x2705; Block a user. A blocked user will no longer appear in the search results and will not generate additional notifications. And, of course, it will no longer be possible to chat with them.
- &#x2705; A user can clearly see if the profile they are viewing is connected or has “liked” their profile and must be able to “unlike” or disconnect from that profile.

## IV.6 Chat

- &#x2705; When two users are connected^4, they must be able to “chat” in real-time^5. The implementation of the chat is up to you. The user must be able to see from any page if a new message is received.

## IV.7 Notifications

- &#x2705; A user must be notified in real-time^6 of the following events:
  - &#x2705; When the user receives a “like”.
  - &#x2705; When the user’s profile has been viewed.
  - &#x2705; When the user receives a message.
  - &#x2705; When a “liked” user also “likes” the user back.

^1 Up to you to define what “fame rating” means as long as your criteria are consistent.
^2 Yes, that’s what dating websites do...
^3 Weight at least several criteria.
^4 You should also remove your “like” to a user whom you had previously “liked”. The user will no longer generate notifications, and you will not be able to chat with them anymore.
^5 When two users are connected, they must be able to “chat” in real-time. The implementation of the chat...
