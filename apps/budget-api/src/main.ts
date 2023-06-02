import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { default as bodyParser } from 'body-parser';
import { default as cors } from 'cors';
import { default as express, Express } from 'express';
import { createServer as createHttpServer } from 'http';
import { join as pathJoin } from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { entities } from './entities';
import { environment } from './environments';
import { resolvers } from './resolvers';

async function addGraphQLMiddleware(
  app: Express
): Promise<void> {
  const graphQlServer = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({
      httpServer: createHttpServer(app)
    })],
    schema: await buildSchema({
      resolvers,
      validate: true
    })
  });
  await graphQlServer.start();
  app.use('/graphql', expressMiddleware(graphQlServer));
}

async function initializeDataSource(): Promise<void> {
  const { databaseOptions } = environment;
  const dataSource = new DataSource({
    ...databaseOptions,
    entities
  });
  await dataSource.initialize();
}

async function main(): Promise<void> {
  const app = express();

  app.use(cors());

  app.use(bodyParser.json());

  app.use('/assets', express.static(pathJoin(__dirname, 'assets')));

  app.get('/api', (_req, res) => {
    res.send({ message: 'Welcome to budget-api'});
  });

  await Promise.all([
    initializeDataSource(),
    addGraphQLMiddleware(app)
  ]);

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', console.error);
}

main();
