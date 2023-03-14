# PostApp

PostApp is a project made to learn how to use both React and Nodejs.

## Usage

- Download the project, use `npm -i` in both folders backend and frontend.
- Create a database.
- Make a copy of both `.env` located at the root of both folders and fill them.

# backend-node/.env

```
PORT= Where your backend will be listening.
MYSQL_HOST= Localhost adress.
MYSQL_USER=
MYSQL_PASS=
MYSQL_BBDD= Database you just created and we will be using.
SECRET= Any sequence of characters to hash passwords.
```

# frontend-react/.env

```
# where your server is listening
REACT_APP_HOST=http://address
```

Now we want to launch `InitDB.js` to create the DB Tables, and if you want something to look at, use `attTestContent.js` to generate random data. Both files located at `backend-node\bbdd\initDB.js`.

All we have left to do is run the server typing npm start in your terminal at both root folders.
