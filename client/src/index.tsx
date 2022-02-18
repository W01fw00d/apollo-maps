import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

import App from "./App";
import graphqlAPI from "./secrets/dev/graphqlAPI.json"; // TODO: handle error when url is 404 (Not Found)

const client = new ApolloClient({
  uri: graphqlAPI.url, // TODO: handle error when url is 404 (Not Found)
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);
