# -Blog-API

A Blog API using Node.js + TS, with postgres for the DB.

## Documentation

```
https://documenter.getpostman.com/view/13110445/2s9YC1Wu8c
```

## Base Url

```
https://blog-api-rwoy.onrender.com/api/v1v1
```

## Tools/Stack Used

- NodeJs (TypeScript & Express)
- Postgres for database
- Sequelize for database ORM
- Postman
- Render for hosting

## Functionalities

- Users can create an account with:
  - email address
  - password
  - first name
  - last name
- Users can get all blog posts
- Users can get a specific post
- Users can add a post
- Users can edit a post
- Users can delete a post
- Implementation of Pagination and the search functionality

## Running locally

To run the app locally, follow the steps below:

## Requirements

- Postgres installed
- Nodejs installed

## Installation

- Clone this repo

```bash
git clone https://github.com/timilehin2000/Blog-Api.git
```

- Change Directory

```bash
cd blog-api
```

- Install packages

```bash
yarn
```

- Initiate `.env` file

```bash
cp .env.example .env
```

- Modify `.env` file with your correct database credentials and desired Port

## Usage

To run this application, execute:

```bash
yarn run dev
```

## Conclusion

This Project is an API that has the functionality of registering a user, login a user and creating protected route that can only be accessed by the logged in user. In which user can upload, fetch, edit and delete a post.
