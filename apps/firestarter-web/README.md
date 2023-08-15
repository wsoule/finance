# @finance/firestarter-web

Web frontend code for firestarter.

## Development Setup

Prior to running this project you will need to set up the graphql hook using the below steps.

* Start the `firestarter-api` project.
* Run `yarn gen:graphql`.

## Scripts

* `nx build firestarter-web`: Builds this application.
* `nx lint firestarter-web`: Lints this application for style issues.
* `nx start firestarter-web`: Starts this application for local development.
* `nx test firestarter-web`: Runs this application's tests (add `--watch` to rerun on source changes).

## Tools

Generated using the below command.

```bash
nx generate @nx/next:application firestarter-web
```
