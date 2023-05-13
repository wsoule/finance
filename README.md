# Finance

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
* `yarn graph`: See a diagram of the dependencies of the projects.

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
