# Friendify - Make Memories With New Friends

This mobile application is build on React Native. Friendify is an app to connect you to new people and make memories.

## Technologies used

- HTML / CSS
- React.js / React Native
- Javascript / Typescript
- REST APIs
- Next.js
- Node.js
- PostgreSQL
- Figma
- Draw SQL

## What is Friendify

What was my motivation for this app? Some people have a harder time to come out ouf their shell to find friends. Friendify simplifies the whole experience and connects you to aweseome people. Friendify is for everyone, whether it's experiencing adventures with various people or if you just feel the need to talk to someone about personal problems.

## How does Friendify work?

On sign up you can decide to only become an Experience User or also an Experience Provider (this can be changed on your profile later). Providers are displayed on the Homepage. Providers have to when they are available when clicking on the plus button of the calendar screen.

As a User you can visit the profile of Providers, check out their personal information, what experiences they provide and what rating they currently have. If you like the experience provided by this person you can go to his / her free timeslots and book a timeslot with him / her. The booked timeslots are then displayed as blue for the User and red for the Provider in their respective calendar.

The User then can click on the booked timeslot on the calendar and rate the Experience Provider.

## Setup

Clone the repo from GitHub and then install the dependencies:

```
git clone https://github.com/stevelaschan/upleveled-final-project
cd upleveled-final-project
yarn
```

Setup a database with postgres on your computer:

```
psql <login>
CREATE DATABASE <database name>;
CREATE USER <username> WITH ENCRYPTED PASSWORD '<pw>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
```

Create a .env file with the userinfo for the database and create .env.example as a template file for userinfo

Use migrations:

```
yarn migrate up
```

To delete data from database run:

```
yarn migrate down
```

To run the development server:

```
yarn start
```

Your project can then be viewed with Expo Go.
Due to React Native not having API routes, a separate project has to be created for the back-end.
I used a next.js app for creating my back-end. It can be found in my repos under: https://github.com/stevelaschan/upleveled-final-project-backend
The deployed version can be found under: https://friendify-backend.herokuapp.com/

## Deployment

To deploy this project, create a [Heroku Account](https://signup.heroku.com/) and follow the instructions

## Project Preview

### Images from the Application

### DrawSQL Database Schema

<img src="/assets/drawsql.png" width="930" height="500">
