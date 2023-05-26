# @finance/budget-web

Web frontend code for Budget.

## Development Setup

Prior to running this project you will need to set up the graphql hook using the below steps.

* Start the `budget-api` project.
* Run `yarn gen:graphql`.

## Scripts

* `nx build budget-web`: Builds this application.
* `nx lint budget-web`: Lints this application for style issues.
* `nx start budget-web`: Starts this application for local development.
* `nx test budget-web`: Runs this application's tests (add `--watch` to rerun on source changes).

## Tools

Generated using the below command.
```bash
nx generate @nx/next:application budget-web
```