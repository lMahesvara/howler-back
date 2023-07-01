# Howler-back

This is the API for the social media platform Howler, which provides access to the platform's data.

## Installation

To install and run the Howler-back API locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/lMahesvara/howler-back.git
```

2. Navigate to the project directory:

```
cd howler-back
```

3. Navigate to the project directory:

```
npm install
```

4. Configure the environment variables by creating a .env file and providing the necessary values. You can use the .env.example file as a template.

5. Start the API server:

```
node index.js
```

6. The API will be available at `http://localhost:3000`.

## Usage

The Howler-back API provides the following endpoints:

- `GET /users/:id`: Retrieves user information by ID.
- `GET /users/username/:username`: Retrieves user information by username.
- `POST /users`: Creates a new user.
- `PUT /users/:id`: Updates user information by ID.
- `PUT /users/password/:id`: Updates user password by ID.
- `GET /hashtags/:name`: Retrieves hashtags by name.
- `POST /hashtags`: Creates a new hashtag.
- `GET /chats/:idUser`: Retrieves chats for a user.
- `GET /chats/:firstId/:secondId`: Retrieves a chat between two users.
- `PUT /chats/read/:idChat/:idUser`: Marks a chat as read for a user.
- `GET /messages/:idChat`: Retrieves messages for a chat.
- `POST /messages/:idChat`: Sends a message to a chat.
- `POST /auth/login`: Authenticates a user and generates a token.
- `PATCH /follow/:idUserFollow/:idUser`: Follows a user.
- `GET /follow/followers/:idUser`: Retrieves followers for a user.
- `GET /follow/following/:idUser`: Retrieves users being followed by a user.
- `PATCH /follow/unfollow/:idUserUnfollow/:idUser`: Unfollows a user.
- `GET /howls/:idHowl`: Retrieves a howl by ID.
- `GET /howls/user/:idUser`: Retrieves howls by a user.
- `GET /howls/hashtag/:hashtag`: Retrieves howls by a hashtag.
- `POST /howls`: Creates a new howl.
- `GET /howls`: Retrieves all howls.
- `POST /howls/like/:idHowl/:idUser`: Likes a howl.
- `POST /howls/unlike/:idHowl/:idUser`: Unlikes a howl.
- `POST /howls/reply/:idHowl`: Replies to a howl.
- `POST /howls/rehowl/:idHowl`: Rehowls a howl.

- `POST /notifications`: Creates a new notification.
- `GET /notifications/:userTo`: Retrieves notifications for a user.
- `PATCH /notifications/read/:id`: Marks a notification as read.

For detailed API documentation, visit `/api-docs` endpoint of the API.

## License

This project is licensed under the [MIT License](LICENSE).
