# Apollo Maps

A simple example project using Apollo Client and Server (GraphQL); and Google Maps JS API

Based on this [frontend challenge](https://github.com/W01fw00d/frontend-challenge)

Also based on this [Apollo Tutorial](https://odyssey.apollographql.com/)

## How to run (`dev` mode)

- Make sure you have Node.js installed.

- You need a Google Maps JS API Key.

Set the `key` in `client/src/secrets/dev/googleMapsAPI.json`

Please be aware that if the `key` doesn't belong to an account with Billing enabled, a pop-up will appear on page load and a "For development purposes only" watermark will be displayed on the map.

If you don't add an `key`, only the Google Maps features will be disabled.

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
