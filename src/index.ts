import express from "express";
import {createServer} from "http";
import {ApolloServer} from "apollo-server-express";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {applyMiddleware} from "graphql-middleware";
import {log} from "./Logger";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";

const app = express();

const server = createServer(app);

const schema = makeExecutableSchema({typeDefs, resolvers});

async function startServer() {
  const apolloServer = new ApolloServer({
    context: () => {},
    schema: applyMiddleware(schema, log),
  });
  await apolloServer.start();
  await apolloServer.applyMiddleware({app});
}

startServer();

const port = 8000;
server.listen(port, () => {
  console.log(
    `🚀 GraphQL server ready at http://localhost:${port}/graphql`
  );
});
