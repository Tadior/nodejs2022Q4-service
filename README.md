# Home Library Service

## Installation

Install the dependencies and devDependencies and start the server.

```sh
npm i
```

Start server in production

```sh
npm start
```

Start server in development

```sh
npm run start:dev
```

Start tests

```sh
npm run test
```

## Important

artistId and albumId are optional, it's might be null or string UUID

## Request routes

GET /user - get all users
GET /user/:id - get single user by id
POST /user - create user
Request Body example:

```sh
{
  "login": "log1",
  "password": "PASSWORD"
}
```

PUT /user/:id - update user's password
Request Body example:

```sh
{
    "oldPassword": "PASS",
    "newPassword": "NEWpass"
}
```

DELETE /user/:id - delete user
GET /track - get all tracks
GET /track/:id - get single track by id
POST /track - create new track
Request Body example:

```sh
{
    "name": "song",
    "artistId": "691dd892-ee30-4428-b939-b71605a7776e",
    "albumId": "14518702-d4e6-4e82-9fa2-22403b3d1a17",
    "duration": 1
}
```

PUT /track/:id - update track info
Request Body example:

```sh
{
    "name": "song3",
    "artistId": "72a9006c-1418-4341-be49-2ff9e86e4589",
    "albumId": "a8aa5281-2e03-4cd8-a2c8-a3a81e900b42",
    "duration": 5
}
```

DELETE /track/:id - delete track
GET /artist - get all artists
GET /artist/:id - get single artist by id
POST /artist - create new artist
Request Body example:

```sh
{
  "name": "Jhony Cash",
  "grammy": true
}
```

PUT /artist/:id - update artist info
Request Body example:

```sh
{
  "name": "Freddie Mercury",
  "grammy": false
}
```

DELETE /artist/:id - delete album
GET /album - get all albums
GET /album/:id - get single album by id
POST /album - create new album
Request Body example:

```sh
{
  "name": "Metallica",
  "year": 1995,
  "artistId": "691dd892-ee30-4428-b939-b71605a7776e"
}
```

PUT /album/:id - update album info
Request Body example:

```sh
{
  "name": "AcDc",
  "year": 1980,
  "artistId": "496c5900-f61f-4980-8d67-527d38cfb9aa"
}
```

DELETE /album/:id - delete album
GET /favs - get all favorites
POST /favs/track/:id - add track to the favorites
DELETE /favs/track/:id - delete track from favorites
POST /favs/album/:id - add album to the favorites
DELETE /favs/album/:id - delete album from favorites
POST /favs/artist/:id - add artist to the favorites
DELETE /favs/artist/:id - delete artist from favorites
