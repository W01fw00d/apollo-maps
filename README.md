# Apollo Maps

A simple example project using Apollo Client and Server (GraphQL); and Google Maps JS API

Based on this [frontend challenge](https://github.com/W01fw00d/frontend-challenge)

## How to run

- Make sure you have Node.js installed.

- You need a Google Maps JS API Key.

Set the `url` and `key` in `client/src/secrets/googleMapsAPI.json` (check the `googleMapsAPIExample.json`)

Please be aware that if the `key` doesn't belong to an account with Billing enabled, a pop-up will appear on page load and a "For development purposes only" watermark will be displayed on the map.

If you don't add an `key`, only the Google Maps features will be disabled.

- Set the `url` in `client/src/secrets/graphqlAPI.json` (check the `graphqlAPIExample.json`)

- Commands (`client/`)

Install the dependencies:

```
npm install
```

Run the App locally in development mode (with hot-reload) in http://localhost:3000/ :

```
npm run start
```

Run the Jest tests:

```
npm run test
```

Generate a test coverage report in /coverage:

```
npm run test-cover
```

Build the App in production mode (for deploying in a server):

```
npm run build
```

## Tech Stack

- TypeScript
- React
- Webpack
- Babel
- Jest
- Material-UI (MUI)
