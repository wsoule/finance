# Finance
## Description
This is a project that leverages various dependencies to build a web application with modern technologies built around helping others with thier financial wellbeing. The project involves creating a full-stack application with a GraphQL API, a React-based front-end, and a PostgreSQL database using TypeORM for data management.

## Features
This project aims to demonstrate the following features:

* Building a GraphQL API using Apollo Server.
* Creating a responsive and accessible UI with Chakra UI.
* Using React and Framer Motion for smooth animations and interactivity.
* Managing form states with Formik.
* Securing passwords using Argon2 hashing.
* Storing sessions with Redis and Express session management.
* Sending emails with Nodemailer.
* Interacting with a PostgreSQL database using TypeORM.
* Utilizing urql as the GraphQL client for the front-end.


## Development Setup

When installing the tools needed for development see the [tools section](#tools) to see which versions to use.

* Install [node](https://nodejs.org) using [nvm](https://github.com/nvm-sh/nvm).
* Install [yarn](https://yarnpkg.com) using node.
  - `npm i -g yarn`
* Install [nx](https://nx.dev/) using yarn.
  - `yarn global add nx`
* Change directories into the root of this repository.
* Install dependencies with yarn
  - `yarn`

## Scripts

* `yarn build:all`: Lints, tests, and builds all projects. Use prior to pushing changes to make sure nothing is broken.
* `yarn gen:graphql`: Generate frontend GraphQL types based on running APIs.
* `yarn graph`: See a diagram of the dependencies of the projects.
* `yarn start`: Run `api` & `web` projects concurrently.

## Tools

Here is a list of tools used to work on this repository.
| Tool                                   | Version |
|----------------------------------------|---------|
| [node](https://nodejs.org)             | 16.20.0 |
| [nx](https://www.npmjs.com/package/nx) | 16.1.4  |
| [yarn](https://yarnpkg.com)            | 1.22.19 |

This repository was generated using [create-nx-workspace](https://www.npmjs.com/package/create-nx-workspace) (version `15.9.2`) with the following command.
```bash
yarn create nx-workspace finance --preset=ts
```
