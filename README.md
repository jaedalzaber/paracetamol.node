# Nodejs-MongoDB-Passport Authentication

The server is live at the following url:

[paracetamol-node.herokuapp.com](https://paracetamol-node.herokuapp.com/)

Alternatively you can run it locally with the command:
```
npm run nodemon
```

Then you can access the api in [http://localhost:3000/](http://localhost:3000/)



## How to Signup

To signup, make a `POST` request at `/users/signup`

```
https://paracetamol-node.herokuapp.com/users/signup
```

Add `username` and `password` in the body like bellow:

```json
{
    "username": "jaed", 
    "password": "password"
}

```
Don't forget to add  `Content-Type` to `apllication/json`  in the headers.


![Signup](https://i.imgur.com/9JXDVtJ.png)


## How to Login

To login, make a `POST` request at  `/users/login`

```
https://paracetamol-node.herokuapp.com/users/login
```

Give the `username` and `password` in the body like bellow:

```json
{
    "username": "jack", 
    "password": "password"
}

```
Don't forget to add  `Content-Type` to `apllication/json`  in the headers.


![login](https://i.imgur.com/5tQV0tR.png)

You will recieve a token as respon. Later you will need to pass this token to access any data.

## How to Access Data Using Token

Now you can access user list using the retrieved token. Just add the token in the `Authorization` key in the header as `Bearer`, then send a `GET` request to `/users`.

```
https://paracetamol-node.herokuapp.com/users
```


![user list](https://i.imgur.com/nV9gozi.png)

## Logout
```
GET: https://paracetamol-node.herokuapp.com/users/logout
```


## License
[MIT](https://choosealicense.com/licenses/mit/)