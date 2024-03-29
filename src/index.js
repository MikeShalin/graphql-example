import React from "react";
import { render } from "react-dom";

import { client } from "./client";

import { ApolloProvider } from "react-apollo";

import { Query } from "react-apollo";
import { gql } from "apollo-boost";

const ExchangeRates = () => (
  <Query
    query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.rates.map(({ currency, rate }) => (
        <div key={currency}>
          <p>{currency}: {rate}</p>
        </div>
      ));
    }}
  </Query>
);

const App = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>My first Apollo app 🚀</h2>
      <ExchangeRates/>
    </div>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
